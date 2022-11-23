import db from './dbCreate.js';

// const logger = require('../logger/winston');
// const log = (msg) => logger.info(msg);

export default {
    getAllMember: async function(){
        try{
            let queryString = "select * from members";
            let result = await db.exe(queryString);
            return result;
        }catch(err){
            console.error("getAllMember 오류");
            return err;
        }
    }, 
    getMM:()=>{

    }     
}