module.exports = {
  development: {
    username: process.env.DEV_MYSQL_USER,
    password: process.env.DEV_MYSQL_PASSWORD,
    database: "recbooker_db",
    host: "localhost",
    dialect: "mysql"
  },
  travis: {
    username: "recBookerUser",
    password: "12345678",
    database: "recbooker_db",
    host: "localhost",
    dialect: "mysql"  
  },
  test: {
    username: process.env.DEV_MYSQL_USER,
    password: process.env.DEV_MYSQL_PASSWORD,
    database: "recbooker_test_db",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
}
