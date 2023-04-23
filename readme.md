
# PlatePalooza API

This is the backend service for my project PlatePalooza, i've been working with it since 01/10/2023.



## Authors

- [@aldo1411](https://www.github.com/aldo1411)


## Run Locally

Clone the project

```bash
  git clone https://github.com/aldo1411/PlatePaloozaServer
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server on development mode

```bash
  npm run start
```

Start the server on production mode

```bash
  npm start
```

If everything works, you should see a message like this

```bash
  🚀 The server has been mounted in.

  🖥  Local:            http://127.0.0.1:3000

  🎉 Happy hacking :)

  💿 Database -> 
    ✅ The database has been connected ;)
```




## Documentation

Tech stack used:
  * NodeJs
  * ExpressJs
  * MongoDB (with mongoose)

Database diagram: see ``` database_diagram.jpg ``` file



## API Reference

### **Users and Roles**
<br />

### ***Post user***

This endpoint will post a user. It will auto encrypt the password, and generate the necessary metadata for the database.

```http
  POST /api/users/
```

| Body       | Type     | Description                    |
| :--------  | :------- | :----------------------------- |
| `userName` | `string` | **Required**. username         |
| `name`     | `string` | **Required**. user's name      |   
| `lastName` | `string` | **Required**. user's lastname  |
| `birthDay` | `string` | **Required**. user's birthday  |
| `email`    | `string` | **Required**. user's email     |
| `password` | `string` | **Required**. user's password  |
| `image`    | `string` | **Required**. user's url image |

<br />

-------------------------------------------------------------------
<br />

### ***Add role to user***

This enpoint will add a existing role to a existing user. Note that when a user is posted automatically the service will add a default role 'user' from the database to the user

```http
  PATCH /api/users/add-role
```

| Body       | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `userName` | `string` | **Required**. username of the user |
| `roleName` | `string` | **Required**. rolename of the role |

<br />

-------------------------------------------------------------------
<br />

#### ***Post role***

This enpoint will create a new role on the database

```http
  POST /api/users/roles
```

| Body       | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `roleName` | `string` | **Required**. rolename of the role |

<br />

-------------------------------------------------------------------
<br />

### ***Delete role***

This enpoint will remove a role from a user

```http
  DELETE /api/users/remove-role/${userId}?roleId
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `userId`   | `string` | **Required**. user id from user    |

| Query      | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `roleId`   | `string` | **Required**. role id from role    |

<br />

-------------------------------------------------------------------
<br />

### ***Login***

This enpoint will login a user and return a jsonwebtoken with a payload that contains the user's roles, id and username. The user can login with email or username

```http
  POST /api/users/login
```

| Body       | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `account`  | `string` | **Required**. could be username or      email    |
| `password` | `string` | **Required**. user's password      |

<br />

-------------------------------------------------------------------
<br />

### **Plate Types**
<br />

### ***Get plate types***

This endpoint will return the plate types on database given a query via url. If query is not passed then it wll return all the plate types from databse

```http
  GET /api/plate-types/?description
```

| Query         | Type     | Description                        |
| :--------     | :------- | :--------------------------------- |
| `description` | `string` | plate type description             |


<br />

-------------------------------------------------------------------
<br />

### ***Post plate Type***

This endpoint will create a new plate type, it will check that the new plate type is not repeated on database and will also validate if the data passed through body is correct

```http
  POST /api/plate-types/
```

| Body          | Type     | Description                        |
| :--------     | :------- | :--------------------------------- |
| `description` | `string` | **Required**. description of the plate type    |

<br />

-------------------------------------------------------------------
<br />

### ***Update plate type***

This endpoint will update a existing plate type and will check if the plate type exists, if the new updated data does'nt correspond to another plate type on database, if the new data does'nt change anything from the plate type to update and will validate if the data passed through the body is correct

```http
  PATCH /api/plate-types/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from plate type   |

| Body              | Type     | Description                        |
| :--------         | :------- | :--------------------------------- |
| `description`   | `string` | **Required**. description from plate type    |

<br />

-------------------------------------------------------------------
<br />

### ***Delete plate type***

This endpoint will set the property "active" to false from plate type on database simulating a delete, this plate type will no longer apear on get requests

```http
  DELETE /api/plate-types/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from plate type   |

<br />

-------------------------------------------------------------------
<br />

### ***Activate plate type***

This endpoint will set the property "active" to true from plate type on database, this plate type will appear again get requests

```http
  PATCH /api/plate-types/activate/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from plate type   |

<br />

-------------------------------------------------------------------
<br />

### **Difficulties**
<br />

### ***Get difficulties***

This endpoint will return the difficulties on database given a query via url. If query is not passed then it wll return all the difficulties from database

```http
  GET /api/difficulties/?description
```

| Query         | Type     | Description                        |
| :--------     | :------- | :--------------------------------- |
| `description` | `string` | difficulty description             |


<br />

-------------------------------------------------------------------
<br />

### ***Post difficulty***

This endpoint will create a new difficulty, it will check that the new difficulty is not repeated on database and will also validate if the data passed through body is correct

```http
  POST /api/difficulties/
```

| Body          | Type     | Description                        |
| :--------     | :------- | :--------------------------------- |
| `description` | `string` | **Required**. description of dificulty    |

<br />

-------------------------------------------------------------------
<br />

### ***Update difficulty***

This endpoint will update a existing difficulty and will check if the difficulty exists, if the new updated data does'nt correspond to another difficulty on database, if the new data does'nt change anything from the difficulty to update and will validate if the data passed through the body is correct

```http
  PATCH /api/difficulties/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from difficulty   |

| Body              | Type     | Description                        |
| :--------         | :------- | :--------------------------------- |
| `description`   | `string` | **Required**. description from difficulty    |

<br />

-------------------------------------------------------------------
<br />

### ***Delete difficulty***

This endpoint will set the property "active" to false from difficulty on database simulating a delete, this difficulty will no longer apear on get requests

```http
  DELETE /api/difficulties/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from difficulty   |

<br />

-------------------------------------------------------------------
<br />

#### ***Activate difficulty***

This endpoint will set the property "active" to true from difficulty on database, this difficulty will appear again get requests

```http
  PATCH /api/difficulties/activate/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from difficulty   |

<br />

-------------------------------------------------------------------
<br />

### **Plates**
<br />

### ***Get plates***

This endpoint will return the plates on database given a query via url. If query is not passed then it wll return all the plate types from databse

```http
  GET /api/plates/?name
```

| Query         | Type     | Description   |
| :--------     | :------- |:------------- |
| `name`        | `string` | plate name    |

<br />

-------------------------------------------------------------------
<br />

### ***Post plate***

This endpoint will create a new plate

```http
  POST /api/plates/
```

| Body      | Type     | Description   |
| :-------- | :------- | :------------ |
| `name`    | `string` | **Required**. name of the plate |
| `plateType` | `string` | **Required**. plate type's id that created the object |
| `ingredients` | `array[]` | **Required**. plate's ingredients |

###### ****note***
The objects that go in the array of ingredients **must** follow the following structure

| Attribute      | Type     | Description   |
| :-------- | :------- | :------------ |
| `quantity`    | `number` | **Required**. quantity of the ingredient |
| `measure` | `string` | **Required**. if the ingredient has a meassure, then add it (ml, mg, oz, etc.) |
| `ingredient` | `string` | **Required**. ingredient's name |

<br />

-------------------------------------------------------------------
<br />

### ***Update plate***

This endpoint will update an existing plate and will check if the plate exists, if the new updated data does'nt correspond to another plate on database, if the new data does'nt change anything from the plate to update and will validate if the data passed through the body is correct

```http
  PATCH /api/plates/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from plate        |

| Body          | Type      | Description                     |
| :----------   | :-------  | :------------------------------ |
| `name`        | `string`  | name from plate                 |
| `plateType`   | `string`  | plate type from plate           |
| `ingredients` | `array[]` | plate's ingredients             |

###### ****note***
The objects that go in the array of ingredients **must** follow the following structure

| Attribute      | Type     | Description   |
| :-------- | :------- | :------------ |
| `quantity`    | `number` | **Required**. quantity of the ingredient |
| `measure` | `string` | **Required**. if the ingredient has a meassure, then add it (ml, mg, oz, etc.) |
| `ingredient` | `string` | **Required**. ingredient's name 

<br />

-------------------------------------------------------------------
<br />

### ***Archieve plate***

This endpoint will set the property "active" to false from plate on database, this plate will no longer apear on get request

```http
  PATCH /api/plates/archieve/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from plate        |

<br />

-------------------------------------------------------------------
<br />

### ***Unarchieve plate***

This endpoint will set the property "active" to true from plate on database, this plate will appear again get requests

```http
  PATCH /api/difficulties/unarchieve/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from plate        |


<br />

-------------------------------------------------------------------
<br />

### ***Activate plate***

This endpoint will delete a plate from database

```http
  DELETE /api/plates/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from plate        |

<br />

-------------------------------------------------------------------
<br />

### **Posts**
<br />

### ***Get posts***

This endpoint will return the posts on database given a query via url. If query is not passed then it wll return all the posts from databse

```http
  GET /api/posts/?description
```

| Query         | Type     | Description         |
| :--------     | :------- |:------------------- |
| `description` | `string` | post description    |

<br />

-------------------------------------------------------------------
<br />

### ***Post post***

This endpoint will create a post

```http
  POST /api/posts/
```

| Body         | Type     | Description                           |
| :----------- | :------- | :------------------------------------ |
| `desciption` | `string` | **Required**. description of the post |
| `image`      | `string` | **Required**. post's image            |
| `plate`      | `string` | **Required**. post's plate id from DB |

<br />

-------------------------------------------------------------------
<br />

### ***Update post***

This endpoint will update an existing post and will check if the post exists, if the new data does'nt change anything from the post to update and will validate if the data passed through the body is correct

```http
  PATCH /api/posts/:id
```

| Body         | Type     | Description             |
| :----------- | :------- | :---------------------- |
| `desciption` | `string` | description of the post |
| `plate`      | `string` | post's plate id from DB |

| Parameters | Type     | Description                 |
| :--------  | :------- | :-------------------------- |
| `id`       | `string` | **Required**. id from post  |

<br />

-------------------------------------------------------------------
<br />

### ***Like post***

This endpoint will add one like to the post desired.

```http
  PATCH /api/posts/likes/add/:id
```

| Parameters | Type     | Description                 |
| :--------  | :------- | :-------------------------- |
| `id`       | `string` | **Required**. id from post  |

<br />

-------------------------------------------------------------------
<br />

### ***Unlike post***

This endpoint will subscribe one like to the post desired.

```http
  PATCH /api/posts/likes/add/:id
```

| Parameters | Type     | Description                 |
| :--------  | :------- | :-------------------------- |
| `id`       | `string` | **Required**. id from post  |

<br />

-------------------------------------------------------------------
<br />

### ***Archieve post***

This endpoint will set the property "active" to false from post on database, this post will no longer apear on get request

```http
  PATCH /api/posts/archieve/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from post        |

<br />

-------------------------------------------------------------------
<br />

### ***Unarchieve plate***

This endpoint will set the property "active" to true from plate on database, this plate will appear again get requests

```http
  PATCH /api/difficulties/unarchieve/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from plate        |


<br />

-------------------------------------------------------------------
<br />

### ***Delete post***

This endpoint will delete a post from database

```http
  DELETE /api/posts/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from post         |

<br />

-------------------------------------------------------------------
<br />

## Contributing

Contributions are always welcome!

Contact me if you want to contribute :)
  * via discord aldo1411#4286
  * via email: lozanotaldo@gmail.com

