import { ApolloClient, InMemoryCache, from, createHttpLink, ApolloLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
    uri: "http://localhost:4000/",
  });
  
const errorLink = onError(({ graphQLErrors, networkError }) => {
if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
    console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    ),
    );
if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authCheckLink = new ApolloLink((operation,forword)=>{
    operation.setContext(({headers})=>(
        {headers:{ 
            ...headers,
            authorization:localStorage.getItem("login-token")
        }}
    ));
    return forword(operation);
});

const client = new ApolloClient({
    link: from([errorLink,authCheckLink,httpLink]),
    cache: new InMemoryCache(),
});

export default client;

  