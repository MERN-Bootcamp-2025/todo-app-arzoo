# todo-app-arzoo
Todo App with role-based authorization.


## Installation
-- For all the dependencies and de-dependencies we need npm
---- npm init

-- install all the required dependencies
---- npm i express dotenv pg nodemailer nodemon jsonwebtoken bcryptjs 

-- since, we need typescript in our application for that we need dev-dependencies
---- npm i typescript @types/node @types/express ts-node @types/jsonwebtoken @types/nodemailer

-- we need to apply class based structure for that we need few more dependencies
---- npm i typeorm typedi class-validator class-transformer

-- to run typescript we need tsconfig file
---- npx tsc --init

## Changes in package.json file
-- Add few scripts
---- "build": "tsc --build",
---- "start": "node ./dist/server.js",
---- "start:dev": "nodemon ./src/server.ts"

Now, if you run "npm run build" it will create dist folder and will generate tsconfig.tsbuildinfo

## Project Structure

```
src/
├── common/
│   ├── dto/            # Data Transfer Objects
│   └── util/           # Utility functions
├── config/             # Configuration files
├── controllers/        # HTTP request handlers
├── interfaces/         # TypeScript interfaces
├── middleware/         # Express middlewares
├── models/            # Database entities
└── services/          # Business logic layer
```

## Environment Variables

All user and app credentials are stored here for security purpose

## Git Clone
```
git remote add origin <ssh-link>
git clone <ssh-link>
```
## Git Branches

1. main --> empty and clean right now
2. dev --> all branch codes are merged in here, created feature branches
3. tb-authentication
4. tb-inviteUsers
5. tb-todoCrud --> Todo CRUD with ownership

## Run Application
```
npm run start:dev
```

## API Testing POSTMAN

1. POST /api/login

---> with superadmin login credentials (generated access token & refresh token)

2. POST /api/invite

--- Auth Bearer Token - admin/superadmin
--- JSON Body - name, email, role

3. GET /api/users

--- Auth Bearer Token - admin/superadmin

4. POST /api/todo

--- Auth Bearer Token - admin/user
--- JSON Body- title , desc, status, priority

5. GET /api/todo || /api/todo?status=done&priority=low || /api/todo?status=done&priority=low&page=2&limit=5

--- Auth Bearer Token - owner of the todo

6. GET /api/todo/:id

--- Auth Bearer Token - owner of the todo

7. PUT /api/todo/:id

--- Auth Bearer Token - owner of the todo

8. PATCH /api/todo/:id

--- Auth Bearer Token - owner of the todo

9. DELETE /api/todo/:id

--- Auth Bearer Token - owner of the todo