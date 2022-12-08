import mariadb from 'mariadb';
import config from './dbConfig.js';

const pool = mariadb.createPool({
    bigIntAsNumber: true,
    connectionLimit : config.connectionLimit,
    acquireTimeout: config.acquireTimeout,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port:3307
});

export default {
    exe: async function(queryStatement) {
        let conn;
        let result;
        
        try {
            try{
                conn = await this.getPoolConnection();
            }
            catch(err){
                console.log('connection error : ' + err);
                throw err;
            }

            try{
                result = await conn.query(queryStatement);
                console.log('query statement : ' + queryStatement );
                return result;
            }catch(err){
                // log('conn.query error : ' + err);
                throw err;
            }
        } 
        catch (err){
            log('exe error : ' + err);
            throw err; 
        } 
        finally{
            try{
                if(conn) await this.endPoolConnection(conn);
            }
            catch(err){
                // log('this.endPoolConnection error : ' + err );
                throw err;
            }
        }
    },

    getPoolConnection: async function () {
        let conn;
        try {
            conn = await pool.getConnection();
            // log("connection succeed");
            return conn;
        } catch (err) {
            // log("pool.getConnection error : " + err);
            throw err;
        }
    },

    endPoolConnection: async function (conn) {
        try {
            if (conn) {
                // log("connection end");
                await conn.end();
            }
        } catch (err) {
            // log("conn.end error : " + err);
            throw err;
        }
    }
}
