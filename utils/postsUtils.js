import Post from '../schemas/Post.js'

/**
 * searches posts by description on database using a case insensitive regex, if no description is 
 * passed, then it sends all the posts
 * @param {*} description description from post
 * @returns a list of similar matches from post description
 */
const searchPostsByDescription = async (description) => {
  let posts

  if (description && description.trim() !== ''){
    const query = new RegExp(description, 'i')
    posts = await Post.find({ description: query, active: true, unsubscribed: false }).populate({path: 'plate', select: '-_id'}).populate({path: 'comments', })
  } else{
    posts = await Post.find() 
  }

  return posts 
}

export {
  searchPostsByDescription
}