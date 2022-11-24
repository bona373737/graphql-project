import jwt from 'jsonwebtoken';
import db from "../db/dbCreate.js";
// const logger = require('../Logger/winston');
// const log = (msg) => logger.info(msg);
const SECRET_KEY = "SeCrEtKeY1234";

export default {
    loginExe: async function (id,password){
        let conn;
        try {
            conn = await db.getPoolConnection();
                
            // pool.escape()
            // In order to avoid SQL Injection attacks, you should always escape any user provided data before using it inside a SQL query.
            // https://www.linkedin.com/pulse/escaping-query-values-node-js-qasim-niaxi
            const queryString =
                "select * from members " +
                "where id = " + conn.escape(id) + 
                " and password = md5(" + conn.escape(password) + ")";

            const result = await conn.query(queryString);
            console.log('loginExe result : ' + JSON.stringify(result));
            // log('loginExe result : ' + JSON.stringify(result));
            
            if(result.length == 0) {
                throw new Error("No such id");
            }

            // 배열에서 필요한 정보만 빼기
            let employee = result.shift();
            
            const token = jwt.sign({
                employeeId : employee.employeeId,
                name : employee.name,
            },SECRET_KEY,{
                expiresIn: '7d'
            });

            return {
                token,
                employee
            };
        } catch (error) {
            // log(`loginExe erorr : ${error}`);
            console.log(`loginExe erorr : ${error}`);
        }
        finally{
            if(conn) db.endPoolConnection(conn);
        }
    },

    checkAuth: async function (token) {
        try {
            console.log('checkAuth data : ' + token);
            // log('checkAuth data : ' + token);

            if (!token) throw new Error('Please Sign in.');

            try {
                const decoded = jwt.verify(token, SECRET_KEY);
                console.log('통과?')
                console.log(decoded);
                return decoded;  
            } catch (error) {
                console.log(`invalid token error : ${error}`);
                // log(`invalid token error : ${error}`);
                throw error;
            }
             
        } catch (error) {
            console.log(`no token error : ${error}`);
            // log(`no token error : ${error}`);
            throw error;
        }
    }


}
