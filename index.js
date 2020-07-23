const { GraphQLServer } = require("graphql-yoga");

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

const typeDefs = `
  type Movie {
    id: ID!
    title: String!
  }

  type Query{
    getAllmovies : [Movie!]!
  }

  type Mutation{
    addMovie(title:String!):Movie!
  }
`;

const resolvers = {
  Query: {
    getAllmovies() {
      return movies;
    },
  },
  Mutation: {
    addMovie(parent, args, ctx, info) {
      if (args) {
        const lastMovie = movies[movies.length - 1];
        movies.push({
          id: lastMovie.id + 1,
          title: args.title,
        });
      } else {
        throw new Error("not args found");
      }

      return movies[movies.length - 1];
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    //if we pass anything here can be available in all resolvers
  },
});

const port = process.env.PORT || 3000;
server.start(port, () => console.log("server running"));
