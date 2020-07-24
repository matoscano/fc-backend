"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Movie",
    embedded: false
  },
  {
    name: "Shareholder",
    embedded: false
  },
  {
    name: "Transfer",
    embedded: false
  },
  {
    name: "BalanceTransaction",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://fc-prisma-server-bfb157d7d9.herokuapp.com/fc-prisma-service/dev`
});
exports.prisma = new exports.Prisma();
