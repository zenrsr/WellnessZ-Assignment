const express = require("express");
// const { Sequelize, DataTypes } = require("sequelize");
const { config } = require("dotenv");
const { Router } = require("express");
const { getAllPosts, createPost } = require("./controllers/post.controller.js");
const multer = require("multer");

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialectOptions: { ssl: { require: true } }
// });

config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const app = express();
const PORT = process.env.PORT || 5000;

const upload = multer();
const router = Router();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// router.get("/posts", (req, res) => {
//   console.log("get all posts");
//   res.send("get all posts");
// });

// router.get("/uploads", upload.single("image"), (req, res) => {
//   console.log("create post");
//   res.send("create a post");
// });

router.get("/posts", getAllPosts);
router.post("/uploads", upload.single("image"), createPost);

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
