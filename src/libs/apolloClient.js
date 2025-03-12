import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Function to create a new Apollo Client instance
const createApolloClient = (language) => {
  const httpLink = new HttpLink({
    uri: "https://api.skipit.app/graphql",
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      "language": language,
    },
  }));

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
