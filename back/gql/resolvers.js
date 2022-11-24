/**
 * @description 
 */
import dbExe from '../db/dbExe.js';

const resolvers ={
    Query:{
        getAllMember: async()=>{
            //데이터베이스에 접근하여 데이터 가져오기
            let result = await dbExe.getAllMember();
            return result; 
        },

        ping(){
            return"pong"
        }
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
                console.log(result)

            } catch (error) {
                console.log(`createMember Error: ${error}`);
                throw error;
            }
        }
    }
    
}

export default resolvers;