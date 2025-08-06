# todo-app-arzoo
Todo App with role-based authorization.


## Installation
-- For all the dependencies and de-dependencies we need npm
---- npm init

-- install all the required dependencies
---- npm i express dotenv pg  nodemon jsonwebtoken bcryptjs 

-- since, we need typescript in our application for that we need dev-dependencies
---- npm i typescript @types/node @types/express ts-node @types/jsonwebtoken 

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

## Git Clone
```
git remote add origin <ssh-link>
git clone <ssh-link>
```