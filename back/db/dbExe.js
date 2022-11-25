import crypto from 'crypto';
import dayjs from 'dayjs';
import db from './dbCreate.js';

// const logger = require('../logger/winston');
// const log = (msg) => logger.info(msg);

export default {
    // Query------------------------------------------------
    getAllMemberExe: async function(){
        try{
            let queryString = "select * from members";
            let result = await db.exe(queryString);
            return result;
        }catch(err){
            console.error("getAllMember 오류");
            return err;
        }
    }, 
    // Mutation----------------------------------------------
    createMemberExe: async function (newMemberData) {
    let conn;

    const nowDate = dayjs().format("YYYY-MM-DD HH:mm:ss");

    const hashedPassword=(password)=>{
        const salt ="12345"
        return crypto.createHmac("sha512",salt).update(password).digest("base64");        
    }

    try {
        conn = await db.getPoolConnection();

        //Null관련함수_nullif,isnull...
        //https://moonpiechoi.tistory.com/107

        // pool.escape()
        // In order to avoid SQL Injection attacks, you should always escape any user provided data before using it inside a SQL query.
        // https://www.linkedin.com/pulse/escaping-query-values-node-js-qasim-niaxi
        let queryString =
            "insert into members (role_no, company_no, name, id, password,isavailable) " +
            "values (" + conn.escape(newMemberData['role_no']) +
                    ", NULLIF(" + conn.escape(newMemberData['company_no']) + ", null)" +
                    "," + conn.escape(newMemberData['name']) +
                    "," + conn.escape(newMemberData['id']) +
                    "," + conn.escape(hashedPassword(newMemberData['password'])) +
                    ", 1"+
                    ")";
        const result = conn.query(queryString);
        console.log("query statement : " + queryString);
        return result;
    } catch (error) {
        console.log("createMemberExe error :" + error);
        throw error;
    }
    finally {
        if (conn) await db.endPoolConnection(conn);
    }
},
     
}