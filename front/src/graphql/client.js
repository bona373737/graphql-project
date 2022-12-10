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


const cache = new InMemoryCache({
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
    cache: cache,
    // 에러처리관련 https://crmrelease.tistory.com/60
    //             https://yongkshire.tistory.com/2
    defaultOptions:{
        watchQuery:{
            fetchPolicy:'network-only',
            // errorPolicy:'ignore',
        },
        query:{
            fetchPolicy:'network-only',
            // loginMember query요청시 infofla(사이트관리자계정)만 comapany_no값이 null인상황
            // partial failure가 발생하기때문에 기본값 errorPolicy:'none'으로 진행.
            // errorPolicy:'all',
        },
        mutate:{
            errorPolicy:'all'
        }
    }
});

// export default client;

  