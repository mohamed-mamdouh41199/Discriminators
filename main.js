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
