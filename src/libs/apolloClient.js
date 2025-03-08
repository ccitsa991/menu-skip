import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://stage.skipit.app/graphql",
  cache: new InMemoryCache(),
});

export default client;
