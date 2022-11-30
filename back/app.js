import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer, gql } from "apollo-server";
import {ApolloServerPluginLandingPageLocalDefault} from 'apollo-server-core'; 
import typeDefs from './gql/gql_schemas.js';
import resolvers from './gql/resolvers.js';
import context from './gql/context.js';

// 외부설정파일 불러오기-> "process.env.환경변수이름"형태로 사용할 수 있음.
// dotenv.config({path:""})
//Express 객체생성
// const app = express();
// app.set('port', process.env.PORT || 3000);
// app.get('/', (req, res) => {
//     res.send('Hello, Express')
// })
// app.listen(app.get('port'), () => {
//     console.log(app.get('port'), '번 포트에서 대기 중')
// })

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    // introspection: "production",
    // introspection: process.env.NODE_ENV !== 'production',
    playground: true,
    playground:{
        //playground로 테스트시 context 함수 무한실행되는 증상 off-->근데.. 왜...
        settings:{
            "schema.polling.enable": false
        }
    },
});

server.listen().then(({url})=>{
    console.log(`Running on ${url}`);
});
