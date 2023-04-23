import Plate from "../schemas/Plate.js"

/**
 * searches plates by name on database using a case insensitive regex, if no name is 
 * passed, then it sends all the plateTypes
 * @param {*} name name from plate type
 * @returns a list of similar matches from plate descrition
 */
const searchPlatesByName = async (name) => {
  let plates

  if (name && name.trim() !== ''){
    const query = new RegExp(name, 'i')
    plates = await Plate.find({ name: query, active: true, unsubscribed: false }).populate({path: 'plateType', select: '-_id description'})
  } else{
    plates = await Plate.find() 
  }

  return plates 
}

export {
  searchPlatesByName
}