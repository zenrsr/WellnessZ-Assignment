// A dummy Post to test out how the database works

const { Sequelize, DataTypes } = require("sequelize");

const { config } = require("dotenv");

config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true
    }
  }
});

const Post = require("./models/post")(sequelize, DataTypes);

const seedDatabase = async () => {
  const post = await Post.create({
    title: "Sukuna",
    description: "The king of curses",
    tag: "Jujutsu Kaisen",
    imageUrl:
      "https://wallpapers.com/images/hd/sukuna-devil-statue-4k-369jhy79qnb0e1z3.jpg"
  });
  await sequelize.close();
};

seedDatabase();
