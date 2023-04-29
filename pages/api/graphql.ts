import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { readFileSync } from "node:fs";
import { prisma } from "@/prisma/db";
import { join } from "path";
import { PrismaClient } from "@prisma/client";
import { Resolvers } from "@/generated";

export type Context = {
  prisma: PrismaClient;
};

const typeDefs = readFileSync(
  join(process.cwd(), "graphql/schema.graphql"),
  "utf8"
);

const resolvers: Resolvers = {
  Query: {
    novels: async (parent, args, context) => {
      return await context.prisma.novel.findMany();
    },
  },
  Novel: {
    authors: async (parent, args, context) => {
      return await context.prisma.author.findMany({
        where: {
          novelId: parent.id,
        },
      });
    },
  },
};

const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, prisma }),
});
