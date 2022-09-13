module.exports = function () {
  return {
    connectionLimit: 10,
    acquireTimeout: 600000,
    waitForConnections: true,
    host: "localhost",
    user: "root",
    password: "123123",
    database: "ojt_db",
  };
};
