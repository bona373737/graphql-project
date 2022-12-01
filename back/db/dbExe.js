import crypto from 'crypto';
import dayjs from 'dayjs';
import db from './dbCreate.js';
import {ValidationError, UserInputError} from 'apollo-server';

// const logger = require('../logger/winston');
// const log = (msg) => logger.info(msg);

export default {
    // Query-----------------------------------------------------
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
            let queryString = `select * from members where role_no=${role}`;
            let result = await db.exe(queryString);
            // console.log(result);
            return result;
        }catch(err){
            console.error("getAllMemberByRoleExe 오류");
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
    getCountDeviceExe : async()=>{
        try{
            let queryString = "select count(*) as total from devices";
            let result = await db.exe(queryString);
            // console.log(result);
            return Number(result[0].total);
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
    getAllDeviceByCompanyExe:async(company_no)=>{
        try{
            let queryString = `select * from devices where company_no=${company_no}  `;
            let result = await db.exe(queryString);
            // console.log(result);
            return result;
        }catch(err){
            console.error("getAllDeviceGroupByCompanyExe 오류");
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

            //insert된 데이터를 조회하여 return 
            queryString = "select * from members where member_no = (select LAST_INSERT_ID())";
            const selectResult = conn.query(queryString);
            console.log("query statement : " + queryString)
            return selectResult;

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

        const hashedPassword=(password)=>{
            const salt ="12345"
            return crypto.createHmac("sha512",salt).update(password).digest("base64");        
        }

        try {
            conn = await db.getPoolConnection();

            let queryString =
                `update members set 
                    role_no = ${conn.escape(updateMemberData['role_no'])},
                    company_no= NULLIF(${(conn.escape(updateMemberData['company_no']))}, null),
                    name=${conn.escape(updateMemberData['name'])},
                    password=${conn.escape(hashedPassword(updateMemberData['password']))},
                    isavailable=1 where id = ${conn.escape(updateMemberData['id'])};
                `
            const insertResult = conn.query(queryString);
            // console.log(insertResult)
            // result = { affectedRows: 1, insertId: 3n, warningStatus: 0 }
            console.log("query statement : " + queryString);

            //update된 데이터를 조회하여 return 
            queryString = `select * from members where id = ${conn.escape(updateMemberData['id'])}`;
            const selectResult = conn.query(queryString);
            console.log("query statement : " + queryString)
            return selectResult;

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
    }
     
}