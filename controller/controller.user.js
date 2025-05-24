const User = require("../model/model.user").User;
const Doctor = require("../model/model.user").Doctor;
const Patient = require("../model/model.user").Patient;
const Admin = require("../model/model.user").Admin;
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate role
    const mapping = { doctor: Doctor, patient: Patient, admin: Admin };
    const Model = mapping[role];
    console.log("Model", Model);
    
    if (!Model) return res.status(400).json({ message: "Invalid role" });

    // Check email uniqueness
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash & create via discriminator
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new Model({ name, email, password: hashed , ...req.body});
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRoleUser = async (req, res) => {
  try {
    const { role } = req.params;
    const mapping = { doctor: Doctor, patient: Patient, admin: Admin };
    const Model = mapping[role];

    if (!Model) return res.status(400).json({ message: "Invalid role" });

    const users = await Model.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userDb.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await userDb.find({ email });
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
  getAllUsers,
  getUserById,
  getUserByEmail,
  getRoleUser
};
