const listenAppMsg = port => `🚀 The server has been mounted in.

🖥  Local:            http://127.0.0.1:${port}

🎉 Happy hacking :)
`

/*------        user messages      ------*/ 

/**
 * function to use when a user is repeated on database
 * @param {String} email email repeated
 * @returns {String} a message with the email of the user repeated
 */
const userRepeatedMessage = (email) => `user with email ${email} already exists`

/**
 * function to use when a user is not found 
 * @param {String} email the email of the user that does'nt exists
 * @returns {String} a message with the email of the user that is not found
 */
const userNotFoundMessage = (email) => `user with email ${email} does not exists`


/*------        role messages      ------*/ 

/**
 * function to use when a role is repeated on database
 * @param {String} role role repeated
 * @returns {String} a message with the name of the role repeated
 */
const roleRepeatedMessage = (role) => `role with name ${role} already exists`

/**
 * function to use when a user has a repeated role
 * @param {String} username username
 * @param {String} roleName rolename
 * @returns {String} a message advising that the user already has the role requested to assign
 */
const roleRepeatedOnUserMessage = (username, roleName) => `user with username "${username}" already has role with name "${roleName}"`



/*------        generic messages      ------*/

/**
 * function to use when a object is created
 * @param {String} object 
 * @returns {String} a message with the type of object created on database
 */
const createdMessage = (object) => `${object} created succesfully`

/**
 * function to use when a generic error happens
 * @returns {String} a generic message to unhandled errors
 */
const somethigWentWrongMessage = () => `Upss... somenthing went wrong. Please try again`

/**
 * funtion to use when something is not found on database
 * @param {String} objectType the type of object that is searched
 * @param {String} attribute the attribute that is sent as parameter of search
 * @param {String} missingAttribute the name of the attribute searched
 * @returns a message saying that the object that is searched does not exists
 */
const notFoundMessage = (objectType, attribute, missingAttribute) => `${objectType} with ${attribute} "${missingAttribute}" does not exists`

/**
 * funtion to use when something already exists on database
 * @param {String} objectType the type of object that is searched
 * @param {String} attribute the attribute that is sent as parameter of search
 * @param {String} repeatedAttibute the name of the repeated attribute
 * @returns a message saying that the object with the specific attribute already exists on database
 */
const alreadyExistsMessage = (objectType, attribute, repeatedAttibute) => `${objectType} with ${attribute} "${repeatedAttibute}" already exists`


export {
    listenAppMsg,
    createdMessage,
    userRepeatedMessage,
    userNotFoundMessage,
    roleRepeatedMessage,
    somethigWentWrongMessage,
    notFoundMessage,
    alreadyExistsMessage
}