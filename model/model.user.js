// using discriminator for user , admin , and doctor
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const options = { discriminatorKey: 'role', timestamps: true };


// Define the ((((base)))) schema for User
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define the Admin schema that extends User
const adminSchema = new Schema({

  department: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

// Define the Doctor schema that extends User
const doctorSchema = new Schema({
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
});

// Define the Patient schema that extends User
const patientSchema = new Schema({
  medicalHistory: {
    type: String,
    required: true,
  },
  allergies: {
    type: String,
    required: true,
  },
  medications: {
    type: String,
    required: true,
  },
});

// Create the base User model
const User = mongoose.model("User", userSchema);
// Create the Admin, Doctor, and Patient models using the base User model
const Admin = User.discriminator("Admin", adminSchema);
const Doctor = User.discriminator("Doctor", doctorSchema);
const Patient = User.discriminator("Patient", patientSchema);

// Export the models
module.exports = {
  User,
  Admin,
  Doctor,
  Patient,
};

// without using discriminator
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const User = mongoose.model("User", userSchema);
// module.exports = User;