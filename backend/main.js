const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./routers');
const layouts = require("express-ejs-layouts");
const methodOverride = require('method-override');
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");

const expressValidator = require("express-validator");
const path = require('path');

// Initialize the app
const app = express();

// Set the port from environment or default to 3000
const PORT = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

// Database connection using Mongoose and the URI from the .env file
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Call the function to connect to MongoDB
connectToDatabase();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use(express.static("public"));
app.use(layouts);

// Body parsing and session setup
app.use(
  methodOverride("_method", { methods: ["POST", "GET"] })
);
app.use(cookieParser("secret_passcode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: { maxAge: 4000000 },
    resave: false,
    saveUninitialized: false
  })
);
app.use(connectFlash());

// Flash messages
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

// EJS layouts
app.use(layouts);

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Use the router for handling requests
app.use("/", router);

// Server listening
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
