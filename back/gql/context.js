import login from "../auth/login.js";
import { AuthenticationError, ForbiddenError } from 'apollo-server-core';


const context = ({req})=>{
    // context의 함수실행시
    // console.log(req.body) ->> {
    //    query : {...}
    //    operationName: 'IntrospectionQuery'
    // }

    // 일반 Query실행시  
    // console.log(req.body) ->> {
    //     query: 'query Query {\n  getAllMember {\n    id\n  }\n}\n',
    //     variables: {},
    //     operationName: 'Query'
    // }

    if(req.body.operationName !== "loginMember"){
        //token이 없는 경우
        if (!req.headers.authorization)
        throw new AuthenticationError("mssing token");
        
        //token이 유효하지 않은 경우
        const token = req.headers.authorization; 
        let nowLoginMember = login.checkAuth(token);
        console.log(nowLoginMember)
        //nowLoginMember데이터 형태(복호화된 token정보)
        //Promise {
        //    { id: 'ruru123', name: '이루루', iat: 1669445668, exp: 1670050468 }
        //  }
        return nowLoginMember 
    }
}
export default context;
