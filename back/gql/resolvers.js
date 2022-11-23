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
    }
}

export default resolvers;