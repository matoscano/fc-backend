const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./prisma/generated/prisma-client");

let movies = [
  {
    id: 1,
    title: "Joker",
  },
  {
    id: 2,
    title: "Avengers: Infinity war",
  },
  {
    id: 3,
    title: "Gladiator",
  },
  {
    id: 4,
    title: "Robin Hood",
  },
];

// const typeDefs = `
//   type Movie {
//     id: ID!
//     title: String!
//   }

//   type Query{
//     getAllmovies : [Movie!]!
//   }

//   type Mutation{
//     addMovie(title:String!):Movie!
//   }
// `;

const resolvers = {
  Query: {
    getAllmovies: (parent, args, context) => {
      console.log("parent", parent);
      console.log("args", args);
      console.log("args", context);
      return movies;
    },
  },
  Mutation: {
    createMovie: (parent, args, context) => {
      return movies[0];
    },
  },
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: {
    prisma,
  },
});

server.start(() => console.log("server running localhost:4000"));
