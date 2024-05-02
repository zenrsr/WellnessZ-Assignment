const { Sequelize } = require("sequelize");
const config = require("../config/config.json");
const dotenv = require("dotenv");
const Post = require("../../models/newpost.js");

dotenv.config(); // Load environment variables from .env file

const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: config[env].dialect,
    dialectModule: require("pg")
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Import your models here and associate them with sequelize
const PostModel = Post(sequelize);
