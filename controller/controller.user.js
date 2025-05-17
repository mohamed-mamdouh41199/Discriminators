const userDb = require("../model/model.user");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { name, email, password } = req.body;

    const existingUser = await userDb.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userDb({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getUser = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await user;
    Db.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createUser,
  getUser,
};
