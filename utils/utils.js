/**
 * checks if there are changes between two objects, if there are any changes
 * it returns a object with the updated attributes and the not updated attributes
 * and updatedAt attribute and modefied attribute, if not, returns a null
 * @param {*} existing the existing object to compare
 * @param {*} updated the updated object to compare
 * @return object ready to use on update function, or null
 */
const getUpdatedObject = (existing, updated) => {
  const updatedFields = {};
  const notUpdatedFields = {};

  for (const [key, value] of Object.entries(updated)) {
    if (existing[key] !== value) {
      updatedFields[key] = value;
    } else {
      notUpdatedFields[key] = value;
    }
  }

  if (Object.keys(updatedFields).length > 0) {
    updatedFields.updatedAt = new Date();
    updatedFields.modified = true;
    const {updatedAt, modified, ...rawUpdatedFields} = updatedFields;
    return {
      updatedFields: {
        ...updatedFields,
        ...notUpdatedFields,
      },
      rawUpdatedFields,
    };
  } else {
    return null;
  }
};


const userIsAuthor = (userId, existingObject) => {
  if (existingObject.author.toString() === userId) {
    return true;
  } else {
    return false;
  }
};

const userIsAdmin = (roles) => {
  if (roles.some((role) => role.name === 'admin')) {
    return true;
  } else {
    return false;
  }
};

export {
  getUpdatedObject,
  userIsAuthor,
  userIsAdmin,
};
