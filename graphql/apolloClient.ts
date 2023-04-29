import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { invariant } from "@apollo/client/utilities/globals";

import type { NormalizedCacheObject } from "@apollo/client";
import { NextPage } from "next";

export const getApolloClient = (
  _?: unknown,
  initialState?: NormalizedCacheObject
) => {
  const isServer = typeof window === "undefined";
  const uri = process.env["NEXT_PUBLIC_GRAPHQL_URL"];
  invariant(uri, `Missing NEXT_PUBLIC_GRAPHQL_URL!`);

  const httpLink = createHttpLink({
    uri,
  });

  return new ApolloClient({
    connectToDevTools: !isServer,
    link: httpLink,
    cache: new InMemoryCache().restore(initialState || {}),
    ssrMode: typeof window === "undefined",
    assumeImmutableResults: true,
  });
};
