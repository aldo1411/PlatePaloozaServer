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
const roleRepeatedOnUserMessage = (userName, roleName) => `user with username "${userName}" already has role with name "${roleName}"`

/**
 * funtion to use when a user does not have a role
 * @param {String} roleName role name
 * @returns ra message advising that the user does not have the role requested
 */
const roleNotIncludedInUser = (roleName) => `user does not have role ${roleName}`

/**
 * function to use when a role has been added to a user
 * @param {String} roleName role name
 * @returns a message advising that the role has been added to a user
 */

const roleAddedMessage = (roleName) => `role ${roleName} added succesfully to user` 

/**
 * function to use when a role has been removed from user
 * @param {String} roleName role name
 * @returns a message advising that the role has been removed from the user
 */
const roleRemovedMessage = (roleName) => `role ${roleName} removed succesfully from user`



/*------        generic messages      ------*/

/**
 * function to use when a object is created
 * @param {String} object the type of object that has been created
 * @returns {String} a message with the type of object created on database
 */
const createdMessage = (object) => `${object} created succesfully`

/**
 * function to use when a object is updated
 * @param {String} object the type of object that has been created
 * @returns {String} a message saying that the object type has been updated
 */
const updatedMessage = (object) => `${object} updated succesfully`

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

/**
 * function to use when user wants to activate a object that is already active
 * @param {String} objectType the type of object that is being activated
 * @returns a message saying that the object is already active on database
 */
const alreadyActive = (objectType) => `Upss... it seems that this ${objectType} is already active`

/**
 * function to use when user wants to unactive an object that is already unactive
 * @param {String} objectType the type of object that is being unactivted
 * @returns a message saying that the object is already unactive on database
 */
const alreadyUnactive = (objectType) => `Upss... it seems that this ${objectType} is already deactivated`

/**
 * function to use when a user wants to update a object from database having the same data as other object on database
 * @param {String} objectType the type of object that user wants to update
 * @returns a message sayung that the object with the specific data already exists
 */
const updatedObjectAlreadyExistsMessage = (objectType) => `Upss... it seems that the ${objectType} you're trying to edit already exists with the same data`

/**
 * function to use when user attempts to make a bad request
 * @returns a generic message saying that the request has not been made correctly
 */
const badRequestMessage = () => `Upss... it seems that you request has been not done correctly, please check your data and try again`

/**
 * function to use when user makes a correct request but recieves an empty response from server
 * @returns a message saying that the requested content is empty
 */
const noContentMessage = () => `It seems that the server reponded correctly but the content is empty`

/**
 * function to use when a user makes a update request but the request does not have nay updated field
 * @returns a message saying that ther are no updated fields
 */
const nonUpdatedFields = () => `It seems that there are no updated fields, please try again with a updated field`

/**
 * function to use when user makes a correct request and recieves the content
 * @returns a message saying that the requested was made correctly
 */
const succeslfullRequestMessage = () => `Succesfull request`



/*------        login messages      ------*/

/**
 * function to use when a user attempts a succesfull login 
 * @returns a message saying that user had a succesfull login
 */
const succesfullLoginMessage = () => `Succesfull login!`

/**
 * function to use when a user attempts a incorrect login
 * @returns a message saying that the password o email/username is incorrect
 */
const incorrecLoginMessage = () => `Passwod or email/username incorrect`



/*------        Security messages      ------*/

/**
 * function to use when the user's data is damaged
 * @returns a messages saying to user to login again
 */
const userInfoDamagedMessage = () => `Upss... something is wrong with your session, we recommend you to log out and log in again.`

/**
 * function to use when a user does not sends a correct token or does not sends any token
 * @returns a message saying that the user needs to login
 */
const accessDeniedMessage = () => `Upss... it seems that you have'nt logged in. Please try to login.`

/**
 * function to use when a user does not sends a token with the required roles for the request
 * @returns a message saying that the user's access is forbiden
 */
const forbiddenAccessMessage = () => `We're sorry. You do'nt have the access to this resources`


export {
    listenAppMsg,
    alreadyActive,
    alreadyUnactive,
    createdMessage,
    updatedMessage,
    userRepeatedMessage,
    userNotFoundMessage,
    nonUpdatedFields,
    roleRepeatedMessage,
    roleRepeatedOnUserMessage,
    roleNotIncludedInUser,
    roleAddedMessage,
    roleRemovedMessage,
    somethigWentWrongMessage,
    noContentMessage,
    succeslfullRequestMessage,
    notFoundMessage,
    alreadyExistsMessage,
    updatedObjectAlreadyExistsMessage,
    badRequestMessage,
    succesfullLoginMessage,
    incorrecLoginMessage,
    accessDeniedMessage,
    forbiddenAccessMessage,
    userInfoDamagedMessage
}