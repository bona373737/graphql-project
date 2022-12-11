/**
 * @description 
 */
import dbExe from '../db/dbExe.js';
import login from '../auth/login.js';
import {ValidationError, UserInputError} from 'apollo-server';

const resolvers ={
    //resolver 기본 매개변수
    //ex) createMember: async(parent,args,context,info)=>{}
    //https://www.apollographql.com/docs/apollo-server/v3/data/resolvers
    Query:{
        loginMember: async(_,{
            id,password
        })=>{
            try {
                let result = await login.loginMemberExe(id,password);
                return result; 
            } catch (error) {
                throw error;
            }
        },
        getAllRole:async()=>{
            let result = await dbExe.getAllRoleExe();
            return result;
        },
        getAllCompany:async()=>{
            let result = await dbExe.getAllCompanyExe();
            return result;
        },
        getMemberByParams:async(_,{params})=>{
            let result = await dbExe.getMemberByParamsExe(params);
            return result;
        },
        getCompanyByParams:async(_,{params})=>{
            let result = await dbExe.getCompanyByParams(params);
            return result;
        },
        getAllDeviceByParams:async(_,{params})=>{
            // console.log(params)
            let result = await dbExe.getAllDeviceByParamsExe(params);
            return result;
        },
        getAllMemberByRole: async(_,{role})=>{
            //args 유효성 검사_role은 세 종류
            //사이트관리자:1, 기업관리자:2, 사용자:3
            if(role != 2 && role != 1 && role != 3){
                throw new UserInputError('Invalid argument value',{argumentName: 'id'});
            }
            let result = await dbExe.getAllMemberByRoleExe(role);
            return result;
        },
        getAllMemberByRoleAndCorp:async(_,{role,companyName})=>{
            let result = await dbExe.getAllMemberByRoleAndCorpExe(role,companyName);
            return result;
        },
        getAllMemberByRoleAndCorpNo:async(_,{role,companyNo})=>{
            let result = await dbExe.getAllMemberByRoleAndCorpNoExe(role,companyNo);
            return result;
        },
        getAllDeviceByCompany: async()=>{
            let result = await dbExe.getAllCompanyExe();
            return result;
        },
        getDeviceByCompany:async(_,{companyNo})=>{
            let result = await dbExe.getDeviceByCompanyExe(companyNo);
            return result;
        },
        // getCountDevice: async(_,{company_no})=>{
        //     let result = await dbExe.getCountDeviceExe(company_no);
        //     console.log(result[0])
        //     return result;
        // },
        // getAllMember: async()=>{
        //     try {
        //         let result = await dbExe.getAllMemberExe();
        //         return result; 
        //     } catch (error) {
        //     }
        // },
        // getAllAdminMember: async()=>{
        //     let result = await dbExe.getAllAdminMemberExe();
        //     return result;
        // },
        // getMemberByCompanyName:async(_,{companyName})=>{
        //     let result = await dbExe.getMemberByCompanyNameExe(companyName);
        //     return result;
        // },
        // getMemberByMemberName:async(_,{memberName})=>{
        //     let result = await dbExe.getMemberByMemberNameExe(memberName);
        //     return result;
        // },
        // getCompanyByCompanyNo:async(_,{companyNo})=>{
        //     let result = await dbExe.getCompanyByCompanyNoExe();
        //     return result;
        // },
        // getAllDevice: async()=>{
        //     let result = await dbExe.getAllDeviceExe();
        //     return result;
        // },
        //기업의 특정 사용자가 담당하는 장비목록
        // getDeviceByCorpAndMember: async(_,{companyNo,memberNo})=>{
        //     let result = await dbExe.getDeviceByCorpAndMemberExe(companyNo,memberNo);
        //     return result;
        // },
    },
    // SubQuery ========================================================================
    Member: {
        company_no: async ({
            company_no
        }) => {
            try {
                let result;
                result = await dbExe.getCompanyByCompanyNoExe(company_no);
                return result[0];
            } catch (error) {
                log("Member error is + " + error);
                throw error;
            }
        }
    },
    DeviceByCompany:{
        company_no: async({
            company_no
        })=>{
            try {
                let result;
                result = await dbExe.getDeviceByCompanyExe(company_no);
                return result;
            } catch (error) {
                log("getAllDeviceExe error : + " + error);
                throw error;
            }
        }
    },
    // Count:{
    //     company_no: async ({
    //         company_no
    //     }) => {
    //         try {
    //             let result;
    //             result = await dbExe.getCountDeviceExe(company_no);
    //             return result[0];
    //         } catch (error) {
    //             log("Count error is + " + error);
    //             throw error;
    //         }
    //     }
    // },
    // Mutation =========================================================================
    Mutation:{
        createMember: async(_,{
            role_no,company_no,name,id,password
        })=>{
            try {
                let newMemberData={
                    role_no : role_no,
                    company_no : company_no,
                    name : name,
                    id : id,
                    password : password
                }
                const result = await dbExe.createMemberExe(newMemberData);
                // console.log(result);
                return result;

            } catch (error) {
                console.log(`createMember Error: ${error}`);
                throw error;
            }
        },

        updateMember: async(_,{
            member_no,isavailable
        })=>{
            try {
                let updateMemberData={
                    member_no: member_no,
                    isavailable: isavailable
                }
                const result = await dbExe.updateMemberExe(updateMemberData);
                // console.log(result);
                return result;

            } catch (error) {
                console.log(`createMember Error: ${error}`);
                throw error;
            }
        },
        
        createDevice: async(_,{
            company_no,member_no,os,device_name
        })=>{
            try {
                let newDeviceData={
                    company_no:company_no,
                    member_no:member_no === 0? null:member_no,
                    os:os,
                    device_name:device_name
                }
                const result = await dbExe.createDeviceExe(newDeviceData);
                return result[0];

            } catch (error) {
                console.log(`createDevice Error: ${error}`);
                throw error;
            }
        },

        updateDevice:async(_,{
            device_no,member_no,device_name,os
        })=>{
            try {
                let updateDeviceData={
                    device_no:device_no,
                    member_no:member_no,
                    device_name:device_name,
                    os:os
                }
                const result = await dbExe.updateDeviceExe(updateDeviceData);
                return result[0];

            } catch (error) {
                console.log(`updateDevice Error: ${error}`);
                throw error;
            }
        },

        createCompany:async(_,{
            company_name, 
            business_number
        })=>{
            try {
                let createCompanyData={
                    company_name : company_name,
                    business_number: business_number
                }
                const result = await dbExe.createCompanyExe(createCompanyData);
                return result;

            } catch (error) {
                console.log(`createCompany Error: ${error}`);
                throw error;
            }
        },
    }
}

export default resolvers;