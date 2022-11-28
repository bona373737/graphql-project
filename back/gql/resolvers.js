/**
 * @description 
 */
import dbExe from '../db/dbExe.js';
import login from '../auth/login.js';

const resolvers ={
    //resolver 기본 매개변수
    //ex) createMember: async(parent,args,context,info)=>{}
    //https://www.apollographql.com/docs/apollo-server/v3/data/resolvers
    Query:{
        loginMember: async(_,{
            id,password
        })=>{
            let result = await login.loginMemberExe(id,password);
            return result; 
        },
        getAllMember: async()=>{
            //데이터베이스에 접근하여 데이터 가져오기
            let result = await dbExe.getAllMemberExe();
            return result; 
        },
        getAllAdminMember: async()=>{
            let result = await dbExe.getAllAdminMemberExe();
            return result;
        },
        getAllMemberByRole: async(_,{role})=>{
            let result = await dbExe.getAllMemberByRoleExe(role);
            return result;
        },
        getMemberByCompanyName:async(_,{companyName})=>{
            let result = await dbExe.getMemberByCompanyNameExe(companyName);
            return result;
        },
        getMemberByMemberName:async(_,{memberName})=>{
            let result = await dbExe.getMemberByMemberNameExe(memberName);
            return result;
        },
        getAllCompany:async()=>{
            let result = await dbExe.getAllCompanyExe();
            return result;
        },
        getCountDevice: async()=>{
            let result = await dbExe.getCountDeviceExe();
            return result;
        },
        getAllDevice: async()=>{
            let result = await dbExe.getAllDeviceExe();
            return result;
        },
    },
    //
    Member: {
        company_no: async ({
            company_no
        }) => {
            try {
                let result;
                result = await dbExe.getAllCompanyExe();
                console.log(result)
                return result[0];
            } catch (error) {
                log("Member error is + " + error);
                throw error;
            }
        }
    },

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
                return result[0];

            } catch (error) {
                console.log(`createMember Error: ${error}`);
                throw error;
            }
        },

        updateMember: async(_,{
            role_no,company_no,name,id,password,isavailable
        })=>{
            try {
                let updateMemberData={
                    role_no : role_no,
                    company_no : company_no,
                    name : name,
                    id:id,
                    password : password,
                    isavailable: isavailable
                }
                const result = await dbExe.updateMemberExe(updateMemberData);
                // console.log(result);
                return result[0];

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
                    member_no:member_no,
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
    }
}

export default resolvers;