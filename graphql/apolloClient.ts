import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

import type { NormalizedCacheObject } from "@apollo/client";

export const getApolloClient = (
  _?: unknown,
  initialState?: NormalizedCacheObject
) => {
  const isServer = typeof window === "undefined";
  const uri =
    process.env["NEXT_PUBLIC_GRAPHQL_URL"] ??
    "http://localhost:3000/api/graphql";

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
