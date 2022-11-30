import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import db from "../db/dbCreate.js";
// const logger = require('../Logger/winston');
// const log = (msg) => logger.info(msg);
const TOKEN_SECRET_KEY = "SeCrEtKeY1234";

export default {
    loginMemberExe: async function(id,password){
        let conn;
        
        const hashedPassword=(password)=>{
            const salt ="12345"
            return crypto.createHmac("sha512",salt).update(password).digest("base64");        
        }

        try {
            conn = await db.getPoolConnection();
    
            // pool.escape()
            // In order to avoid SQL Injection attacks, you should always escape any user provided data before using it inside a SQL query.
            // https://www.linkedin.com/pulse/escaping-query-values-node-js-qasim-niaxi
            const queryString =
                "select * from members " +
                "where id = " + conn.escape(id) + 
                " and password = " + conn.escape(hashedPassword(password));

            const result = await conn.query(queryString);
            // console.log(result);
            // log('loginExe result : ' + JSON.stringify(result));

            if(result.length == 0) {
                throw new Error("아이디 또는 비밀번호가 잘못되었습니다.");
            }

            // result값 배열의 첫번째값 : 회원정보객체 
            let memberData = result.shift();
            
            // 등록된 사용자인것이 확인된 경우 token 발행
            const token = jwt.sign({
                id : memberData.id,
                name : memberData.name,
            },TOKEN_SECRET_KEY,{
                expiresIn: '7d'
            });

            return {
                token,
                memberData
            };
        } catch (error) {
            // log(`loginExe erorr : ${error}`);
            console.log(`loginMemberExe erorr : ${error}`);
        }
        finally{
            if(conn) db.endPoolConnection(conn);
        }
    },

    checkAuth: async function (token) {
        try {
            //token 복호화
            //Synchronously verify given token using a secret or a public key to get a decoded token
            const decoded = jwt.verify(token, TOKEN_SECRET_KEY);
            // console.log(decoded);
            return decoded;  
        } catch (error) {
            console.log(`invalid token error : ${error}`);
            // log(`invalid token error : ${error}`);
            throw error;
        }
    },

    // Authentication middleware
    // https://escape.tech/blog/9-graphql-security-best-practices/
    authMiddleware : (next) => (parent, args, context) => {
        if(!context.user) {
            throw new Error("Unauthenticated")
        }
        return next(parent, args, context)
    },
}
