import Difficulty from "../schemas/Difficulty.js"

/**
 * searches diffieculties by description on database using a case insensitive regex, if no description is 
 * passed, then it sends all the difficulties
 * @param {*} description description from difficulty
 * @returns a list of similar matches from difficulty descrition
 */
const searchDifficultiesByDescription = async (description) => {
  let difficulties

  if (description != null || description != undefined){
    const query = new RegExp(description, 'i')
    difficulties = await Difficulty.find({ description: query, active: true })
  } else{
    difficulties = await Difficulty.find() 
  }

  return difficulties 
}

export {
  searchDifficultiesByDescription
}