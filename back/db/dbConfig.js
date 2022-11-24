const dbConfig = {
    connectionLimit: 10, // default 10
    // connectTimeout: 100, //20000, default 10000(10sec)
    acquireTimeout: 600000, //Timeout to get a new connection from pool in ms. default 10000(10sec)
    waitForConnections: true, //default true
    host: process.env.dbServer || "127.0.0.1",
    user: process.env.dbUser || "root",
    password: process.env.dbPW || "123qwe!@#",
    database: process.env.dbName || "ojt",
}
export default dbConfig;