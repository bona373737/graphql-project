const mariadb = require("mariadb");

const pool = mariadb.createPool({
  bigIntAsNumber: true,
  connectionLimit: 30,
  acquireTimeout: 3000,
  host: "localhost",
  user: "root",
  password: "123123",
  database: "ojt_db",
  port: 3308,
  allowPublicKeyRetrieval: true,
});

module.exports = {
  exe: async function (queryStatement) {
    let conn;
    let result;

    try {
      conn = await this.getPoolConnection();
      result = await conn.query(queryStatement);
      console.log("query statement: " + queryStatement);

      return result;
    } catch (err) {
      console.log("Err");
      throw err;
    } finally {
      try {
        if (conn) await this.endPoolConnection(conn);
      } catch (err) {
        console.log("this.endPoolConnection error: " + err);
        throw err;
      }
    }
  },

  getPoolConnection: async function () {
    let conn;
    try {
      conn = await pool.getConnection();
      console.log("connection succeed");

      return conn;
    } catch (err) {
      console.log("pool.getConnection error : " + err);
      throw err;
    }
  },

  endPoolConnection: async function (conn) {
    try {
      if (conn) {
        console.log("connection end");
        await conn.end();
      }
    } catch (err) {
      console.log("conn.end error : " + err);
      throw err;
    }
  },
};
