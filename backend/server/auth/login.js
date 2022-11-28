const jwt = require("jsonwebtoken");
const db = require("../db/dbCreate");
const SECRET_KEY = "SeCrEtKeY1234";
const crypto = require("crypto");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  loginExe: async function (id, password) {
    let conn;
    try {
      function encrypt(pw) {
        const salt = "12456";
        const newpw = crypto
          .createHmac("sha512", salt)
          .update(pw)
          .digest("base64");
        return newpw;
      }

      const dbPW = async () => {
        try {
          conn = await db.getPoolConnection();
          const queryString =
            "select password from users where id = " + conn.escape(id);
          const dbPW = await conn.query(queryString);
          return dbPW[0].password;
        } catch (error) {
          console.log(`encryptLogin Error: ${error}`);
        } finally {
          if (conn) db.endPoolConnection(conn);
        }
      };

      // console.log("111111111111111", await dbPW());
      // console.log("222222222222222", encrypt(password));

      if ((await dbPW()) === encrypt(password)) {
        try {
          conn = await db.getPoolConnection();
          let token;
          const queryString =
            "select * from users " +
            "where id = " +
            conn.escape(id) +
            " and password = " +
            conn.escape(encrypt(password));
          const result = await conn.query(queryString);
          console.log("loginExe result: " + JSON.stringify(result));

          if (result.length == 0) {
            throw new AuthenticationError("No such id");
          }

          let user = result.shift();

          token = jwt.sign(
            {
              id: user.id,
              name: user.name,
            },
            SECRET_KEY,
            {
              expiresIn: "7d",
            }
          );
          return {
            token,
            user,
          };
        } catch (err) {
          console.log(`loginExe Error: ${err}`);
        } finally {
          if (conn) db.endPoolConnection(conn);
        }
      } else {
        console.log("로그인 실패");
      }
    } catch (err) {
      console.log("0538 loginExe:  " + err);
    }
  },

  checkAuth: async function (token) {
    try {
      if (!token) throw new Error("Please Sign in");
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
      } catch (err) {
        console.log(`invalid token error: ${err}`);
        throw AuthenticationError();
      }
    } catch (err) {
      console.log(`no token error: ${err}`);
      throw err;
    }
  },
};
