import Difficulty from "../schemas/Difficulty.js"
import difficultySchema from "../schemas/joi_schemas/Difficulty.js"
import { searchDifficultiesByDescription } from "../utils/difficultyUtils.js"
import { alreadyActive, alreadyExistsMessage, alreadyUnactive, badRequestMessage, createdMessage, noContentMessage, nonUpdatedFields, notFoundMessage, somethigWentWrongMessage, succeslfullRequestMessage, updatedMessage, updatedObjectAlreadyExistsMessage } from "../utils/messages.js"
import { checkMongoId ,getUpdatedObject } from "../utils/utils.js"

/**
 * gets all difficulties given a query from db and sends them to user
 * if no query is sent, it sends all the difficulties from db.
 * if there are none items it alerts to user
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code, message and resultset
 */ 
const getDifficultiesByDescription = async (req, res) => {
  const description = req.query.description

  try {
    const difficulties = await searchDifficultiesByDescription(description)
    if(difficulties.length != 0){
      return res.status(200).json({ message: succeslfullRequestMessage(), resultSet: difficulties}) 
    }else{
      return res.status(200).json({ message: noContentMessage(), resultSet: difficulties})
    }
  } catch (e) {
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}

/**
 * save a new difficulty on db, checks if the user that creates it is valid and checks if the
 * difficulty type already exists
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code, message and resultset 
 */
const saveDifficulty = async (req, res) => {
  let newDifficulty
  const {error} = difficultySchema.validate(req.body)

  if(error){
    return res.status(400).json({message: error.message})
  }

  try{ 
    const existsDifficulty = await Difficulty.findOne({ description: req.body.description })
    if(existsDifficulty){
      return res.status(409).json({message: alreadyExistsMessage('difficulty', 'description', req.body.description)})
    }

    newDifficulty = new Difficulty(req.body)
    await newDifficulty.save()
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }

  return res.status(201).json({message: createdMessage('plate type'), resultSet: { id: newDifficulty._id }})
}

/**
 * updates a difficulty on db if exists on database
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message
 */
const updateDifficulty = async (req, res) => {
  const {error} = difficultySchema.validate(req.body)
  if(error){
    return res.status(400).json({message: error.message})
  }

  const existDifficulty = await Difficulty.findById(req.params.id)
  if(!existDifficulty){
    return res.status(404).json({message: notFoundMessage('difficulty', 'id', req.params.id)})
  }

  const fields = getUpdatedObject(existDifficulty.toObject(), req.body)
  if(!fields){
    return res.status(200).json({message: nonUpdatedFields()})
  }

  if( await Difficulty.findOne(fields.rawUpdatedFields)){
    return res.status(409).json({message: updatedObjectAlreadyExistsMessage('difficulty')})
  }

  try{
    await Difficulty.findByIdAndUpdate(req.params.id, fields.updatedFields)

    return res.status(200).json({ message: updatedMessage('difficulty') })
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }

}

/**
 * updates a difficulty on db and sets active property to false if exists on database
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message
 */
const deleteDifficulty = async (req, res) => {
  if (!req.params.id){
    return res.status(400).json( {message: badRequestMessage()} )
  }

  try{
    const existDifficulty = await Difficulty.findById(req.params.id)

    if(!existDifficulty){
      return res.status(404).json({message: notFoundMessage('difficulty', 'id', req.body.id)})
    }

    if(!existDifficulty.toObject().active){
      return res.status(409).json({message: alreadyUnactive('difficulty')})
    }

    await Difficulty.findByIdAndUpdate(req.params.id, { $set: { active: false } })
    return res.status(200).json({ message: updatedMessage('difficulty') })
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}

/**
 * updates difficulty on database to make it active
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message
 */
const activateDifficulty = async (req, res) => {
  if (!req.params.id){
    return res.status(400).json( {message: badRequestMessage()} )
  }

  const existsDifficulty = await Difficulty.findById(req.params.id)
  if(!existsDifficulty){
    return res.status(404).json({message: notFoundMessage('difficulty', 'id', req.params.id)})
  }
  if(existsDifficulty.toObject().active){
    return res.status(409).json({message: alreadyActive('difficulty')})
  }

  try{
    await Difficulty.findByIdAndUpdate(req.params.id, { $set: { active: true } })

    return res.status(200).json({ message: updatedMessage('difficulty') })
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}


export {
  getDifficultiesByDescription,
  saveDifficulty,
  updateDifficulty,
  deleteDifficulty,
  activateDifficulty
}