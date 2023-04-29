import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "@/graphql/apolloClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={getApolloClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
