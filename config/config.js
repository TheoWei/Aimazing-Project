module.exports = {
  "username": process.env.USERNAME || "root",
  "password": process.env.PASSWORD || "root",
  "database": process.env.DATABASE || "aimazing",
  "host": process.env.HOST || "127.0.0.1",
  "dialect": process.env.DIALECT || "mysql",
  "secret": process.env.SECRET || "secret"
}
