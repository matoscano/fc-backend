## FilmChain movies app

This repository (fc-backend) contains a graphql api corresponding with the backend for FilmChain movies app.

This app was created using node js (https://nodejs.org/es/) and graphql yoga(https://github.com/prisma-labs/graphql-yoga).

It use prisma v2 (https://www.prisma.io/docs/) to manage the graphql entities and schema. With help of prisma client we connect with our DB.

It use a Postres database hosted on heroku.

## ⚛️ How to run locally

Using the command `yarn start` the app runs locally.

`IMPORTANT`: We need to provide the url of our database. Provide a .env file with the valid DATABASE_URL inside the prisma folder.

## 🛠 Ready to deploy

The app is deployed on heroku. Just manually deploy your changes in master branch.

## 🚀 Technologies stack

- Node.js
- GraphQl (graphql-yoga)
- Prisma v2
