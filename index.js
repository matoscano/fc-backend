const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getShareholderById: async (parent, args, context) => {
      return await context.prisma.shareholder.findOne({
        where: {
          id: args.shareholderId,
        },
        include: {
          Movie: true,
          BalanceTransaction: {
            include: {
              Transfer: true,
            },
          },
        },
      });
    },
    getAllMovies: async (parent, args, context) => {
      return await context.prisma.movie.findMany();
    },
    getAllShareholders: async (parent, args, context) => {
      return await context.prisma.shareholder.findMany({
        include: {
          Movie: true,
          BalanceTransaction: true,
        },
      });
    },
    getAllTransferByMovie: async (parent, args, context) => {
      return await context.prisma.transfer.findMany({
        where: { Movie: { id: args.movieId } },
      });
    },
    getAllShareholdersByMovie: async (parent, args, context) => {
      return await context.prisma.shareholder.findMany({
        where: { Movie: { id: args.movieId } },
        include: {
          BalanceTransaction: true,
        },
      });
    },
  },
  Mutation: {
    createMovie: async (parent, args, context) => {
      return await context.prisma.movie.create({
        data: { title: args.title, cover: args.cover },
      });
    },
    createShareholder: async (parent, args, context) => {
      const shareholder = await context.prisma.shareholder.create({
        data: {
          firstName: args.firstName,
          lastName: args.lastName,
          address: args.address,
          iban: args.iban,
          Movie: {
            connect: { id: args.movieId },
          },
        },
        include: { Movie: true, BalanceTransaction: true },
      });
      return shareholder;
    },
    createTransfer: async (parent, args, context) => {
      /* Step 1: Create transfer */
      const transfer = await context.prisma.transfer.create({
        data: {
          amount: args.amount,
          description: args.description,
          Movie: {
            connect: { id: args.movieId },
          },
        },
        include: { Movie: true },
      });

      /* Step 2: Find how many shareholders belongs to the film related to the transfer previously created. */
      const shareholdersByFilm = await context.prisma.shareholder.findMany({
        select: { id: true },
        where: { Movie: { id: args.movieId } },
      });

      /* Step 3: Divide the amount among all the shareholders involved. */
      const shareholdersCount = shareholdersByFilm.length;
      const balanceQuantity = args.amount / shareholdersCount;

      /* Step 4: Create a balance transaction for each shareholder related to the transfer created. */
      shareholdersByFilm.map(async (shareholder) => {
        await context.prisma.balanceTransaction.create({
          data: {
            amount: balanceQuantity,
            Transfer: {
              connect: { id: transfer.id },
            },
            Shareholder: {
              connect: { id: shareholder.id },
            },
          },
        });
      });
      return transfer;
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
