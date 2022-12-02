import { ApolloClient, InMemoryCache, from, createHttpLink, ApolloLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { nowMemberInVar } from '../makeVar';

const httpLink = createHttpLink({
    uri: "http://localhost:4000/",
  });
  
const errorLink = onError(({ graphQLErrors, networkError }) => {
if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions }) =>
    console.log(
        `[GraphQL error]: ErrorCode:${JSON.stringify(extensions.code)} Message: ${message}, Location: ${locations}, Path: ${path}`,
    ),
    );
if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authCheckLink = new ApolloLink((operation,forword)=>{
    operation.setContext(({headers})=>(
        {headers:{ 
            ...headers,
            authorization:localStorage.getItem("loginToken")
        }}
    ));
    return forword(operation);
});


export const cache = new InMemoryCache({
    typePolicies:{
        Query:{
            fields:{
                nowMember:{
                    read(){
                        return nowMemberInVar();
                    }
                }
            }
        }
    }
})




export const client = new ApolloClient({
    link: from([errorLink,authCheckLink,httpLink]),
    cache: cache
});

// export default client;

  