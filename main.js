// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const userDb = require("./model/model.user").User;
// const Doctor = require("./model/model.user").Doctor;
// const Patient = require("./model/model.user").Patient;
// const Admin = require("./model/model.user").Admin;
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT;
// const MONGODB_URI = process.env.MONGODB_URI;
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// const userRouter = require("./routes/routes.user");
// app.use("/", userRouter);

// // app.use(express.urlencoded({ extended: false }));

// app.listen(PORT, async () => {
//   await mongoose.connect(MONGODB_URI);

//     const user = new userDb({
//       name: "Dr. John Doe",
//       email: "xxxyz@gmai.com:",
//       password: "password123",
//       // specialization: "Cardiology",
//       // experience: 10,
//       // licenseNumber: "123456789",
//     });
//     await user.save();
//     console.log("Doctor added:", user);
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose.connect(MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

const userRouter = require("./routes/routes.user");
app.use("/", userRouter);


// app.use(express.urlencoded({ extended: false }));




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
