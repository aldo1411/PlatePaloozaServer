import PlateType from "../schemas/PlateType.js"

/**
 * searches plate types by description on database using a case insensitive regex, if no description is 
 * passed, then it sends all the plateTypes
 * @param {*} description description from plate type
 * @returns a list of similar matches from plate type descrition
 */
const searchPlateTypeByDescription = async (description) => {
  let plateTypes

  if (description != null || description != undefined){
    const query = new RegExp(description, 'i')
    plateTypes = await PlateType.find({ description: query, active: true }).populate({ path: 'author', select: 'userName' })
  } else{
    plateTypes = await PlateType.find() 
  }

  return plateTypes 
}

export {
  searchPlateTypeByDescription,
}