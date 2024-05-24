const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 5000;

const path = require("path");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// import user from model
const User = require("./model/user");

// routes
const categoryRouter = require('./router/categoryRouter');
const serviceRouter = require('./router/serviceRouter');
const paymentRouter = require('./router/PaymentRouter');
const reviewRouter = require('./router/reviewRouter');



//connection with mongoose
// -------------------------------------------------------------------------------------------------------------------
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8wioxsd.mongodb.net/technician?retryWrites=true&w=majority`
  ) //connected to farmStand database
  .then(() => {
    console.log("Mongo connnection successful: ");
  })
  .catch((e) => {
    console.log("Mongo connection failed !!");
    console.log(e);
  });

// -------------------------------------------------------------------------------------------------------------------

//middleware
// -------------------------------------------------------------------------------------------------------------------

app.use(
  cors({
    origin: ["http://localhost:5173"],
    // origin: [
    //   "https://jobzen-45cf0.web.app",
    //   "https://jobzen-45cf0.firebaseapp.com",
    // ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Varify Toke middleware
const varifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }
    req.user = decoded;
    next();
  });
};


app.use("/api/category", categoryRouter)
app.use("/api/service", serviceRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/review", reviewRouter)


// -------------------------------------------------------------------------------------------------------------------

//server
// -------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
// -------------------------------------------------------------------------------------------------------------------

// routes
// -------------------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("this is homepage");
});

// Jwt Token Issue
app.post("/jwt", (req, res) => {
  const body = req.body;
  // console.log(body);
  const token = jwt.sign(body, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ success: true });
});

app.post("/logout", (req, res) => {
  const body = req.body;
  // console.log("logging out user...", body);
  res.clearCookie("token", { maxAge: 0 });
  res.json({ success: true });
});


// User Route
// --------------------------------------------------------------------------------------------------------------

// create a user
app.post("/users", async (req, res) => {
  try {
    const body = req.body;
    const user = new User(body);
    const data = await user.save();
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// get all user
app.get("/users", async (req, res) => {
  try {
    const data = await User.find({});
    res.send(data);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});
// get a user based on email
app.get("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const data = await User.findOne({ email });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// get a user based on id
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.send({ msg: "User Deleted SuccessFully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});


app.patch('/users/:userId/role', async (req, res) => {
  const userId = req.params.userId;
  const newRole = req.body.role; // Assuming role is sent in the request body

  try {
    // Find the user by ID in your database and update their role
    // This is a placeholder, replace it with your actual database logic
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's role
    user.role = newRole;
    await user.save();

    res.status(200).json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error('Failed to update user role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// --------------------------------------------------------------------------------------------------------------