
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

#### Post user

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

-------------------------------------------------------------------

#### Add role to user

This enpoint will add a existing role to a existing user. Note that when a user is posted automatically the service will add a default role 'user' from the database to the user

```http
  PATCH /api/users/add-role
```

| Body       | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `userName` | `string` | **Required**. username of the user |
| `roleName` | `string` | **Required**. rolename of the role |

-------------------------------------------------------------------

#### Post role

This enpoint will create a new role on the database

```http
  POST /api/users/roles
```

| Body       | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `roleName` | `string` | **Required**. rolename of the role |

-------------------------------------------------------------------

#### Post role

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

-------------------------------------------------------------------

#### Post role

This enpoint will login a user and return a jsonwebtoken with a payload that contains the user's roles, id and username. The user can login with email or username

```http
  POST /api/users/login
```

| Body       | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `account`  | `string` | **Required**. could be username or      email    |
| `password` | `string` | **Required**. user's password      |


-------------------------------------------------------------------

-------------------------------------------------------------------

### Plate Types

### Get plate types

This endpoint will return the plate types on database given a query via url. If query is not passed then it wll return all the plate types from databse

```http
  GET /api/plate-types/?description
```

| Query         | Type     | Description                        |
| :--------     | :------- | :--------------------------------- |
| `description` | `string` | plate type description             |


-------------------------------------------------------------------

#### Post plate Type

This endpoint will create a new plate type, it will check that the new plate type is not repeated on database and will also validate if the data passed through body is correct

```http
  POST /api/plate-types/
```

| Body          | Type     | Description                        |
| :--------     | :------- | :--------------------------------- |
| `description` | `string` | **Required**. description of the plate type    |
| `author` | `string` | **Required**. user's id that created the object      |

-------------------------------------------------------------------

#### Update plate type

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

-------------------------------------------------------------------

#### Delete plate type

This endpoint will set the property "active" to false from plate type on database simulating a delete, this plate type will no longer apear on get requests

```http
  DELETE /api/plate-types/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from plate type   |

-------------------------------------------------------------------

#### Activate plate type

This endpoint will set the property "active" to true from plate type on database, this plate type will appear again get requests

```http
  PATCH /api/plate-types/activate/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from plate type   |

-------------------------------------------------------------------

### Difficulties

### Get difficulties

This endpoint will return the difficulties on database given a query via url. If query is not passed then it wll return all the difficulties from database

```http
  GET /api/difficulties/?description
```

| Query         | Type     | Description                        |
| :--------     | :------- | :--------------------------------- |
| `description` | `string` | difficulty description             |


-------------------------------------------------------------------

#### Post difficulty

This endpoint will create a new difficulty, it will check that the new difficulty is not repeated on database and will also validate if the data passed through body is correct

```http
  POST /api/difficulties/
```

| Body          | Type     | Description                        |
| :--------     | :------- | :--------------------------------- |
| `description` | `string` | **Required**. description of dificulty    |

-------------------------------------------------------------------

#### Update difficulty

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

-------------------------------------------------------------------

#### Delete difficulty

This endpoint will set the property "active" to false from difficulty on database simulating a delete, this difficulty will no longer apear on get requests

```http
  DELETE /api/difficulties/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from difficulty   |

-------------------------------------------------------------------

#### Activate difficulty

This endpoint will set the property "active" to true from difficulty on database, this difficulty will appear again get requests

```http
  PATCH /api/difficulties/activate/${id}
```

| Parameters | Type     | Description                        |
| :--------  | :------- | :--------------------------------- |
| `id`       | `string` | **Required**. id from difficulty   |

-------------------------------------------------------------------



## Contributing

Contributions are always welcome!

Contact me if you want to contrbute :)
  * via discord aldo1411#4286
  * via email: lozanotaldo@gmail.com

