import crypto from 'crypto';
import dayjs from 'dayjs';
import db from './dbCreate.js';
import {ValidationError, UserInputError} from 'apollo-server';
// import { GET_NOWMEMBER } from '../../front/src/graphql/query.js';

// const logger = require('../logger/winston');
// const log = (msg) => logger.info(msg);

export default {
    // Query-----------------------------------------------------
    getAllRoleExe:async()=>{
        try{
            let queryString = "select * from role";
            let result = await db.exe(queryString);
            console.log(result);
            return result;
        }catch(err){
            console.error("getAllRoleExe 오류");
            return err;
        }
    },
    getAllMemberExe: async ()=>{
        try{
            let queryString = "select * from members";
            let result = await db.exe(queryString);
            // console.log(result);
            return result;
        }catch(err){
            console.error("getAllMember 오류");
            return err;
        }
    }, 
    getMemberByParamsExe:async(params)=>{
        try{
            console.log(params)
            let queryString = "select m.member_no,m.role_no,m.company_no,m.name, m.id, m.reg_date,m.isavailable from members as m"
            
            //조건분기..대환장.... 코드 수정필요!!!
            if(params.member_name && params.role_no && params.company_no){
                queryString += ` left join company as c on m.company_no = c.company_no where m.role_no=${Number(params.role_no)} and m.company_no = ${params.company_no} and m.name like "%${params.member_name}%"`
            }
            else if(params.role_no && params.member_name){
                queryString += ` where m.role_no=${Number(params.role_no)} and m.name like "%${params.member_name}%"`
            }else if(params.role_no && params.company_name ){
                queryString += ` left join company as c on m.company_no = c.company_no where m.role_no=${Number(params.role_no)} and c.company_name like "%${params.company_name}%"`
            }else if(params.role_no && params.company_no){
                queryString += ` left join company as c on m.company_no = c.company_no where m.role_no=${Number(params.role_no)} and c.company_no = ${params.company_no}`
            }
            else if(params.role_no){
                queryString += ` where m.role_no=${Number(params.role_no)};`
            }
            console.log(queryString);
            let result = await db.exe(queryString);
            // console.log(result);
            return result;
        }catch(err){
            console.error("getMemberByParamsExe 오류");
            return err;
        }
    },
    getCompanyByParams:async(params)=>{
        try{
            console.log(params)
            let queryString = "select c.company_no, c.company_name, c.business_number, count(device_no) as device_total from devices as d right outer join company as c on c.company_no = d.company_no"
            
            if(params.company_name){
                queryString += ` where c.company_name like "%${params.company_name}%"`;
            }else if(params.business_number){
                queryString += ` where c.business_number=${params.business_number}`;
            }
            queryString += " group by c.company_no;"
            console.log(queryString);
            let result = await db.exe(queryString);
            // console.log(result);
            return result;
        }catch(err){
            console.error("getCompanyByParams 오류");
            return err;
        }
    },
    getAllAdminMemberExe : async ()=>{
        try{
            let queryString = "select * from members where role_no=2";
            let result = await db.exe(queryString);
            // console.log(result);
            return result;
        }catch(err){
            console.error("getAllAdminMember 오류");
            return err;
        }
    },
    getAllMemberByRoleExe:async(role)=>{
        try{
            let queryString = `select * from members where role_no=${role} order by reg_date desc`;
            let result = await db.exe(queryString);
            // console.log(result);
            return result;
        }catch(err){
            console.error("getAllMemberByRoleExe 오류");
            return err;
        }
    },
    getAllMemberByRoleAndCorpExe:async(role,companyName)=>{
        try{
            let queryString = `select m.member_no, m.id, m.name, m.reg_date, m.company_no, m.isavailable from members as m 
                                left join company as c on m.company_no = c.company_no 
                                where m.role_no=${role} 
                                and c.company_name like "%${companyName}%";`;
            console.log(queryString)
            let result = await db.exe(queryString);
            console.log(result);
            return result;
        }catch(err){
            console.error("getAllMemberByRoleAndCorpExe 오류");
            return err;
        }
    },
    getAllMemberByRoleAndCorpNoExe:async(role,companyNo)=>{
        try{
            let queryString = `select * from members where role_no=${role} and company_no=${companyNo}`;
            console.log(queryString)
            let result = await db.exe(queryString);
            return result;
        }catch(err){
            console.error("getAllMemberByRoleAndCorpNoExe 오류");
            return err;
        }
    },
    getMemberByCompanyNameExe:async(companyName)=>{
        try{
            let queryString = `select * from members where company_no=(select company_no from company where company_name=${JSON.stringify(companyName)})`;
            let result = await db.exe(queryString);
            console.log(result);
            return result;
        }catch(err){
            console.error("getMemberByCompanyNameExe 오류");
            return err;
        }  
    },
    getMemberByMemberNameExe:async(memberName)=>{
        try{
            let queryString = `select * from members where name=${JSON.stringify(memberName)}`;
            let result = await db.exe(queryString);
            // console.log(result);
            return result;
        }catch(err){
            console.error("getMemberByMemberNameExe 오류");
            return err;
        }
    },
    getAllCompanyExe:async()=>{
        try{
            let queryString = `select * from company`;
            let result = await db.exe(queryString);
            // console.log(result);
            return result;
        }catch(err){
            console.error("getAllCompanyExe 오류");
            return err;
        }
    },
    getCompanyByCompanyNoExe:async(companyNo)=>{
        try{
            let queryString = `select * from company where company_no=${companyNo}`;
            let result = await db.exe(queryString);
            // console.log(result);
            return result;
            // if(companyNo){
            // }else{
            //     return null;
            // }
        }catch(err){
            console.error("getCompanyByCompanyNoExe 오류");
            return err;
        }
    },
    // getCountDeviceExe : async(company_no)=>{
    //     try{
    //         let queryString = `select company_no, count(*) as device_total from devices where company_no=${company_no} group by company_no;`;
    //         let result = await db.exe(queryString);
    //         console.log(result);
    //         return result
    //     }catch(err){
    //         console.error("getCountDeviceExe 오류");
    //         console.log(err)
    //         return err;
    //     }
    // },
    getDeviceByCompanyExe: async(companyNo)=>{
        try{
            let queryString = `select * from devices where company_no=${companyNo}`;
            let result = await db.exe(queryString);
            return result;
        }catch(err){
            console.error("getCountDeviceExe 오류");
            return err;
        }
    },
    getAllDeviceExe: async()=>{
        try{
            let queryString = "select * from devices";
            let result = await db.exe(queryString);
            // console.log(result);
            return result;
        }catch(err){
            console.error("getCountDeviceExe 오류");
            return err;
        }
    },
    getDeviceByCorpAndMemberExe: async(companyNo,memberNo)=>{
        try{
            let queryString = `select * from devices where company_no=${companyNo} and member_no=${memberNo}`;
            let result = await db.exe(queryString);
            // console.log(result);
            return result;
        }catch(err){
            console.error("getCountDeviceExe 오류");
            return err;
        }
    },
    getAllDeviceByParamsExe:async(params)=>{
        try{
            console.log(params)
            let queryString = "select * from devices"

            if(params.company_no){
                queryString += ` where company_no=${params.company_no}; `
            }else if(params.member_no){
                queryString += ` where member_no=${params.member_no}; `
            }
            let result = await db.exe(queryString);
            // console.log(result);
            return result;
        }catch(err){
            console.error("getAllDeviceByParamsExe 오류");
            return err;
        }   
    },


    // Mutation-----------------------------------------------------
    createMemberExe: async (newMemberData)=>{
        let conn;

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
                        ",1"+
                        ")";
            const insertResult = conn.query(queryString);
            // result = { affectedRows: 1, insertId: 3n, warningStatus: 0 }
            console.log("query statement : " + queryString);
            return `[ ${newMemberData.name} ]님 계정등록 완료!`;

            //insert된 데이터를 조회하여 return 
            // queryString = "select * from members where member_no = (select LAST_INSERT_ID())";
            // const selectResult = conn.query(queryString);
            // console.log("query statement : " + queryString)
            // return selectResult;

        } catch (error) {
            console.log("createMemberExe error :" + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    },

    updateMemberExe: async(updateMemberData)=>{
        let conn;

        // const hashedPassword=(password)=>{
        //     const salt ="12345"
        //     return crypto.createHmac("sha512",salt).update(password).digest("base64");        
        // }

        try {
            conn = await db.getPoolConnection();

            let queryString =
                `update members set isavailable=${updateMemberData.isavailable} where member_no=${updateMemberData.member_no};
                `
                // `update members set 
                //     role_no = ${conn.escape(updateMemberData['role_no'])},
                //     company_no= NULLIF(${(conn.escape(updateMemberData['company_no']))}, null),
                //     name=${conn.escape(updateMemberData['name'])},
                //     password=${conn.escape(hashedPassword(updateMemberData['password']))},
                //     isavailable=1 
                //     where id = ${conn.escape(updateMemberData['id'])};
                // `
            const insertResult = conn.query(queryString);
            // console.log(insertResult)
            // result = { affectedRows: 1, insertId: 3n, warningStatus: 0 }
            console.log("query statement : " + queryString);

            const returnMsg=updateMemberData.isavailable===true? 
                updateMemberData.member_no +"번 계정이 활성화 되었습니다." : updateMemberData.member_no +"번 계정이 비활성화 되었습니다. "
            
            return returnMsg;

            //update된 데이터를 조회하여 return 
            // queryString = `select * from members where id = ${conn.escape(updateMemberData['id'])}`;
            // const selectResult = conn.query(queryString);
            // console.log("query statement : " + queryString)
            // return selectResult;

        } catch (error) {
            console.log("createMemberExe error :" + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    },

    createDeviceExe: async (newDeviceData)=>{
        let conn;

        try {
            conn = await db.getPoolConnection();

            //새로운 장비 insert
            let queryString =
                "insert into devices (company_no,member_no, os, device_name) " +
                "values (" + conn.escape(newDeviceData['company_no']) +
                        "," + conn.escape(newDeviceData['member_no']) +
                        "," + conn.escape(newDeviceData['os']) +
                        "," + conn.escape(newDeviceData['device_name']) +
                        ")";
            console.log("query statement : " + queryString);
            const insertResult = conn.query(queryString);
            
            //insert된 데이터를 조회하여 return 
            queryString = "select * from devices where device_no = (select LAST_INSERT_ID())";
            const selectResult = conn.query(queryString);
            console.log("query statement : " + queryString)
            return selectResult;

        } catch (error) {
            console.log("createDeviceExe error :" + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    },

    updateDeviceExe:async(updateDeviceData)=>{
        let conn;

        try {
            conn = await db.getPoolConnection();

            //새로운 장비 insert
            let queryString =
            `update devices set 
            member_no = ${conn.escape(updateDeviceData['member_no'])},
            device_name= ${conn.escape(updateDeviceData['device_name'])},
            os=${conn.escape(updateDeviceData['os'])}
            where device_no=${conn.escape(updateDeviceData['device_no'])};
            `
            const insertResult = conn.query(queryString);
            console.log("query statement : " + queryString);
            
            //insert된 데이터를 조회하여 return 
            // queryString = `select * from devices where device_no =${conn.escape(updateDeviceData['device_no'])};`;
            queryString = "select * from devices where device_no =" + conn.escape(updateDeviceData['device_no']) +";"
            const selectResult = conn.query(queryString);
            console.log("query statement : " + queryString)
            return selectResult;

        } catch (error) {
            console.log("createDeviceExe error :" + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    },

    createCompanyExe:async(createCompanyData)=>{
        let conn;

        try {
            conn = await db.getPoolConnection();

            //새로운 장비 insert
            let queryString =
            "insert into company (company_name,business_number) " +
            "values (" + conn.escape(createCompanyData['company_name']) +
                    "," + conn.escape(createCompanyData['business_number']) +
                    ")";

            const result = conn.query(queryString);
            console.log("query statement : " + queryString);
            
            return "신규기업 ["+createCompanyData.company_name+"] 등록완료";

        } catch (error) {
            console.log("createCompanyExe error :" + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    }
     
}