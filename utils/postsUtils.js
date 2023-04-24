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
    posts = await Post.find({ description: query, active: true, unsubscribed: false })
    .select('-_id -active -unsubscribed -modified, -author -modified -createdAt -updatedAt')
    .populate({
      path: 'plate',
      match: { active: true, }, //TODO add: unsubscribed: false when database is cleared
      select: '-_id -modified -author -createdAt -updatedAt',
      populate: {
        path: 'plateType',
        select: 'description -_id'
      }
    })
    .populate({
      path: 'comments', 
      match: { active: true },
      select: 'description -_id -createdAt -updatedAt', 
      populate: {
        path: 'author',
        select: 'userName -_id -createdAt -updatedAt',
      }
    })
  } else{
    posts = await Post.find({ active: true, unsubscribed: false })
    .select('-_id -active -unsubscribed -modified, -author -modified -createdAt -updatedAt')
    .populate({
      path: 'plate',
      match: { active: true, }, //TODO add: unsubscribed: false when database is cleared
      select: '-_id -modified -author -createdAt -updatedAt',
      populate: {
        path: 'plateType',
        select: 'description -_id'
      }
    })
    .populate({
      path: 'comments', 
      match: { active: true },
      select: 'description -_id', 
      populate: {
        path: 'author',
        select: 'userName -_id',
      }
    })
  }

  return posts 
}

export {
  searchPostsByDescription
}