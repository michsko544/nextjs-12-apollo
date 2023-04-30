import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { readFileSync } from "node:fs";
import { prisma } from "@/prisma/db";
import { join } from "path";
import { Resolvers } from "@/generated";

const typeDefs = readFileSync(
  join(process.cwd(), "graphql/schema.graphql"),
  "utf8"
);

const resolvers: Resolvers = {
  Query: {
    novels: async (_parent, _args, context) => {
      return (await context.prisma.novel.findMany()).map((novel) => ({
        ...novel,
        createdAt: novel.createdAt.toISOString(),
        updatedAt: novel.updatedAt.toISOString(),
      }));
    },
    authors: async (_parent, _args, context) => {
      return await context.prisma.author.findMany();
    },
  },
  Novel: {
    authors: async (parent, args, context) => {
      const authorsOnNovels = await context.prisma.authorsOnNovels.findMany({
        where: { novelId: parent.id },
        include: { author: true },
      });

      return authorsOnNovels.map((a) => a.author);
    },
  },
  Author: {
    novels: async (parent, args, context) => {
      const authorsOnNovels = await context.prisma.authorsOnNovels.findMany({
        where: { authorId: parent.id },
        include: { novel: true },
      });

      return authorsOnNovels.map((a) => ({
        ...a.novel,
        createdAt: a.novel.createdAt.toISOString(),
        updatedAt: a.novel.updatedAt.toISOString(),
      }));
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, prisma }),
});
