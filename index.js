const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

const resolvers = {
  Query: {
    getAllmovies: async (parent, args, context) => {
      console.log("args", context);
      return await context.prisma.movie.findMany();
    },
  },
  Mutation: {
    createMovie: async (parent, args, context) => {
      console.log("create movie", args);
      return await context.prisma.movie.create({
        data: { title: args.title },
      });
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
