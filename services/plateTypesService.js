import PlateType from "../schemas/PlateType.js"
import { plateTypeSchema, plateTypeUpdateSchema } from "../schemas/joi_schemas/PlateType.js"
import { searchPlateTypeByDescription } from "../utils/plateTypeUtils.js"
import { noContentMessage, succeslfullRequestMessage, alreadyExistsMessage, somethigWentWrongMessage, createdMessage, notFoundMessage, updatedMessage, badRequestMessage, nonUpdatedFields, updatedObjectAlreadyExistsMessage, alreadyActive, alreadyUnactive } from "../utils/messages.js"
import { getUpdatedObject } from "../utils/utils.js"

/**
 * gets all plate types given a query from db and sends them to user
 * if no query is sent, it sends all the plate types from db.
 * if there are none items it alerts to user
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code, message and resultset
 */ 
const getPlatTypesByDescription = async (req, res) => {
  const description = req.query.description

  try {
    const plateTypes = await searchPlateTypeByDescription(description)
    if (plateTypes.length != 0){
      return res.status(200).json({ message: succeslfullRequestMessage(), resultSet: plateTypes}) 
    }else{
     return res.status(200).json({ message: noContentMessage(), resultSet: plateTypes})
    }
  } catch (e) {
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}

/**
 * save a new plateType on db, checks if the user that creates it is valid and checks if the
 * plate type already exists
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code, message and resultset 
 */
const savePlateType = async (req, res) => {
  let newPlateType
  const {error} = plateTypeSchema.validate(req.body)

  if(error){
    return res.status(400).json({message: error.message})
  }

  try{ 
    const existPlateType = await PlateType.findOne({ description: req.body.description })
    if(existPlateType){
      return res.status(409).json({message: alreadyExistsMessage('plate type', 'description', req.body.description)})
    }

    newPlateType = new PlateType({...req.body, author: req.user.id})
    await newPlateType.save()
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }

  return res.status(201).json({message: createdMessage('plate type'), resultSet: { id: newPlateType._id }})
}

/**
 * updates a plate type on db if exists on database
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message
 */
const updatePlateType = async (req, res) => {
  const {error} = plateTypeUpdateSchema.validate(req.body)
  if(error){
    return res.status(400).json({message: error.message})
  }

  const existPlateType = await PlateType.findById(req.params.id)
  if(!existPlateType){
    return res.status(404).json({message: notFoundMessage('plate type', 'id', req.params.id)})
  }

  const fields = getUpdatedObject(existPlateType.toObject(), req.body)
  if(!fields){
    return res.status(200).json({message: nonUpdatedFields()})
  }
  if(await PlateType.findOne(fields.rawUpdatedFields)){
    return res.status(409).json({message: updatedObjectAlreadyExistsMessage('plate type')})
  }

  try{
    await PlateType.findByIdAndUpdate(req.params.id, fields.updatedFields)

    return res.status(200).json({ message: updatedMessage('plate type') })
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }

}

/**
 * updates a plate type on db and sets active property to false if exists on database
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message
 */
const deletePlateType = async (req, res) => {
  if (!req.params.id){
    return res.status(400).json( {message: badRequestMessage()} )
  }

  try{
    const existsPlate = await PlateType.findById(req.params.id)

    if(!existsPlate){
      return res.status(404).json({message: notFoundMessage('plate type', 'id', req.body.id)})
    }
    if(!existsPlate.toObject().active){
      return res.status(409).json({message: alreadyUnactive('plate type')})
    }

    await PlateType.findByIdAndUpdate(req.params.id, { $set: { active: false,  modified: true, updatedAt: new Date() } })
    return res.status(200).json({ message: updatedMessage('plate type') })
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}

/**
 * updates plate type on database to make it active
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message
 */
const activatePlateType = async (req, res) => {
  if (!req.params.id){
    return res.status(400).json( {message: badRequestMessage()} )
  }

  const existsPlateType = await PlateType.findById(req.params.id)
  if(!existsPlateType){
    return res.status(404).json({message: notFoundMessage('plate type', 'id', req.params.id)})
  }
  if(existsPlateType.toObject().active){
    return res.status(409).json({message: alreadyActive('plate type')})
  }

  try{
    await PlateType.findByIdAndUpdate(req.params.id, { $set: { active: true, updatedAt: new Date() } })

    return res.status(200).json({ message: updatedMessage('plate type') })
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}



export {
  getPlatTypesByDescription,
  savePlateType,
  updatePlateType,
  deletePlateType,
  activatePlateType
}