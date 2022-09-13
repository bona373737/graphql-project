const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const app = express();

const fs = require("fs");

const typeDefs = require("./gql/gql_schemas");
const resolvers = require("./gql/resolvers");

const login = require("./auth/login");

const cors = require("cors");
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,

  // jwt 토큰 확인
  context: async ({ req }) => {
    try {
      // console.log(
      //   "---------------------------무언가 왔음!!----------------------------------------"
      // );
      // console.log(req.headers);
      // console.log(
      //   "-------------------------------------------------------------------"
      // );
      // console.log(req.body);
      let user;
      // loginUser -> gql 타입
      // console.log("req.body.query", req.body.query);
      if (req.body.operationName !== "NoTokenAPI") {
        user = await login.checkAuth(req.headers.authorization);
        return user;
      }
    } catch (err) {
      console.log("token " + err);
      throw err;
    }
  },
});

server.start().then((res) => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log("Now browse to http://localhost:4000" + server.graphqlPath)
  );
});

// 이미지 파일 rest로 받아옴
const multer = require("multer");
const path = require("path");
const db = require("./db/dbCreate");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // front단 public 폴더로 저장
    cb(null, "../../frontend/public/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename =
      path.basename(file.originalname, ext) + "_" + Date.now() + ext;
    cb(null, filename);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1025 * 1024 },
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const filename = req.file.filename;
  let conn;
  try {
    conn = await db.getPoolConnection();
    const queryString = `update product set img_url = ${JSON.stringify(
      filename
    )} where img_url is null`;
    const result = conn.query(queryString);
    console.log("query Statement: " + queryString);
    res.send(result);
  } catch (err) {
    console.log("Error: " + err);
  } finally {
    if (conn) {
      await db.endPoolConnection(conn);
    }
  }
});
