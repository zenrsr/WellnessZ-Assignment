const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const cloudinary = require("cloudinary");
const { Sequelize, DataTypes } = require("sequelize");
const { config } = require("dotenv");
const { Op } = require("sequelize");

config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: { ssl: { require: true } }
});

const Post = require("../../models/newpost.js")(sequelize, DataTypes);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.getAllPosts = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "DESC",
    keyword,
    tag
  } = req.query;

  const options = {
    offset: (page - 1) * limit,
    limit: parseInt(limit),
    order: [[sortBy, sortOrder]],
    where: {}
  };

  // if (keyword) {
  //   options.where = {
  //     ...options.where,
  //     [Op.or]: [
  //       { title: { [Op.like]: `%${keyword}%` } },
  //       { description: { [Op.like]: `%${keyword}%` } }
  //     ]
  //   };
  // }
  if (keyword) {
    options.where[Op.or] = [
      { title: { [Op.like]: `%${keyword}%` } },
      { description: { [Op.like]: `%${keyword}%` } }
    ];
  }

  if (tag) {
    options.where.tag = tag;
  }

  try {
    const { count, rows } = await Post.findAndCountAll(options);
    res.json({ posts: rows, totalPages: Math.ceil(count / limit) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createPost = async (req, res) => {
  const { title, description, tag } = req.body;
  const image = req.file.buffer;

  if (!image) {
    return res.status(400).json({ error: "Image is required" });
  }

  // Image buffer to a temporary file
  const tempImagePath = `${__dirname}/temp_image.jpg`;
  await writeFile(tempImagePath, image);

  try {
    const uploadResult = await cloudinary.uploader.upload(tempImagePath, {
      folder: "posts"
    });
    const imageURL = uploadResult.secure_url;

    // Delete the temporary image file
    fs.unlinkSync(tempImagePath);

    const newPost = await Post.create({
      title,
      description,
      tag,
      image: imageURL
    });
    console.log("🟢 Post Created");
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error while creating a post" });
  }
};
