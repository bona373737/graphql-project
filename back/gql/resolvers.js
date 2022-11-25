/**
 * @description 
 */
import dbExe from '../db/dbExe.js';
import login from '../auth/login.js';

const resolvers ={
    Query:{
        getAllMember: async()=>{
            //데이터베이스에 접근하여 데이터 가져오기
            let result = await dbExe.getAllMemberExe();
            return result; 
        },
        loginMember: async(_,{
            id,password
        })=>{
            let result = await login.loginMemberExe(id,password);
            return result; 
        },
    },
    Mutation:{
        //resolver 기본제공? argument
        //ex) createMember: async(parent,args,context,info)=>{}
        //https://www.apollographql.com/docs/apollo-server/v3/data/resolvers
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
                // result = { affectedRows: 1, insertId: 3n, warningStatus: 0 }
                console.log(`affectedRows: ${result.affectedRows}`);
                return "회원가입완료";

            } catch (error) {
                console.log(`createMember Error: ${error}`);
                throw error;
            }
        }
    }
}

export default resolvers;