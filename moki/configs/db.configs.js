module.exports = {
    development: {
      host: process.env.HOST || "mongo",
      port: process.env.PORT || 27017,
      database: process.env.DB_NAME || "shiftdb",
    },
  };
  