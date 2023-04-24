import Plate from '../schemas/Plate.js';
import {plateSchema, plateUpdateSchema} from '../schemas/joi_schemas/Plate.js';
import {noContentMessage, succeslfullRequestMessage, somethigWentWrongMessage, createdMessage, notFoundMessage, updatedMessage, badRequestMessage, nonUpdatedFields, alreadyActive, alreadyUnactive, deletedMessage, forbiddenAccessMessage} from '../utils/messages.js';
import {searchPlatesByName} from '../utils/platesUtils.js';
import {getUpdatedObject, userIsAdmin, userIsAuthor} from '../utils/utils.js';


/**
 * gets all plate given a query from db and sends them to user
 * if no query is sent, it sends all the plate from db.
 * if there are none items it alerts to user
 * @param {*} req http request
 * @param {*} res http response
 * @return response with status code, message and resultset
 */
const getPlatesByDescription = async (req, res) => {
  const name = req.query.name;

  try {
    const plates = await searchPlatesByName(name);
    if (plates.length != 0) {
      return res.status(200).json({message: succeslfullRequestMessage(), resultSet: plates});
    } else {
      return res.status(200).json({message: noContentMessage(), resultSet: plates});
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({message: somethigWentWrongMessage()});
  }
};

/**
 * saves a new plate on db
 * @param {*} req http request
 * @param {*} res http response
 * @return response with status code, message and resultset
 */
const savePlate = async (req, res) => {
  let newPlate;
  const {error} = plateSchema.validate(req.body);

  if (error) {
    return res.status(400).json({message: error.message});
  }

  try {
    newPlate = new Plate({...req.body, author: req.user.id});
    await newPlate.save();
  } catch (e) {
    console.error(e);
    return res.status(500).json({message: somethigWentWrongMessage()});
  }

  return res.status(201).json({message: createdMessage('plate'), resultSet: {id: newPlate._id}});
};

/**
 * updates a plate on db if exists on database. Checks if user that updates is the author of the plate or if it's admin
 * @param {*} req http request
 * @param {*} res http response
 * @return response with status code and message
 */
const updatePlate = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json( {message: badRequestMessage()} );
  }

  const {error} = plateUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({message: error.message});
  }

  const existPlate = await Plate.findById(req.params.id);
  if (!existPlate) {
    return res.status(404).json({message: notFoundMessage('plate', 'id', req.params.id)});
  }

  if (!userIsAuthor(req.user.id, existPlate) && !userIsAdmin(req.user.roles)) {
    return res.status(401).json({message: forbiddenAccessMessage()});
  }

  const fields = getUpdatedObject(existPlate.toObject(), req.body);
  if (!fields) {
    return res.status(200).json({message: nonUpdatedFields()});
  }

  try {
    await Plate.findByIdAndUpdate(req.params.id, fields.updatedFields);

    return res.status(200).json({message: updatedMessage('plate')});
  } catch (e) {
    console.error(e);
    return res.status(500).json({message: somethigWentWrongMessage()});
  }
};

/**
 * Archives plate on database by setting active property on false
 * @param {*} req http request
 * @param {*} res http response
 * @return response with status code and message
 */
const archievePlate = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json( {message: badRequestMessage()} );
  }

  try {
    const existsPlate = await Plate.findById(req.params.id);

    if (!userIsAuthor(req.user.id, existsPlate) && !userIsAdmin(req.user.roles)) {
      return res.status(401).json({message: forbiddenAccessMessage()});
    }

    if (!existsPlate) {
      return res.status(404).json({message: notFoundMessage('plate', 'id', req.body.id)});
    }
    if (!existsPlate.toObject().active) {
      return res.status(409).json({message: alreadyUnactive('plate')});
    }

    await Plate.findByIdAndUpdate(req.params.id, {$set: {active: false, modified: true, updatedAt: new Date()}});
    return res.status(200).json({message: updatedMessage('plate')});
  } catch (e) {
    console.error(e);
    return res.status(500).json({message: somethigWentWrongMessage()});
  }
};

/**
 * unarchieves a plate on database by setting the active property on true
 * @param {*} req http request
 * @param {*} res http response
 * @return response with status code and message
 */
const unArchievePlate = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json( {message: badRequestMessage()} );
  }

  const existsPlate = await Plate.findById(req.params.id);

  if (!userIsAuthor(req.user.id, existsPlate) && !userIsAdmin(req.user.roles)) {
    return res.status(401).json({message: forbiddenAccessMessage()});
  }

  if (!existsPlate) {
    return res.status(404).json({message: notFoundMessage('plate', 'id', req.params.id)});
  }

  if (existsPlate.toObject().active) {
    return res.status(409).json({message: alreadyActive('plate')});
  }

  try {
    await Plate.findByIdAndUpdate(req.params.id, {$set: {active: true, updatedAt: new Date()}});

    return res.status(200).json({message: updatedMessage('plate')});
  } catch (e) {
    console.error(e);
    return res.status(500).json({message: somethigWentWrongMessage()});
  }
};

/**
 * deletes plate on database
 * @param {*} req http request
 * @param {*} res http response
 * @return response with status code and message
 */
const deletePlate = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json( {message: badRequestMessage()} );
  }

  try {
    const existsPlate = Plate.findById(req.params.id);
    if (!userIsAuthor(req.user.id, existsPlate) && !userIsAdmin(req.user.roles)) {
      return res.status(401).json({message: forbiddenAccessMessage()});
    }

    if (!existsPlate) {
      return res.status(404).json({message: notFoundMessage('plate', 'id', req.body.id)});
    }

    await Plate.deleteOne({_id: req.params.id});
    return res.status(200).json({message: deletedMessage('plate')});
  } catch (e) {
    console.error(e);
    return res.status(500).json({message: somethigWentWrongMessage()});
  }
};

export {
  getPlatesByDescription,
  savePlate,
  updatePlate,
  archievePlate,
  unArchievePlate,
  deletePlate,
};
