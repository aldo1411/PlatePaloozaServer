
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

## Contributing

Contributions are always welcome!

Contact me if you want to contrbute :)
  * via discord aldo1411#4286
  * via email: lozanotaldo@gmail.com

