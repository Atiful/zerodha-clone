const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const  cors = require('cors');

const bodyParser = require('body-parser');


const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;







const session = require('express-session');
const MongoStore = require('connect-mongo');

// other constants
const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URL;

const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");

// models
const order = require("./models/OrderSchema.js");
const holding = require("./models/HoldingSchema.js");
const watchlist = require("./models/WatchListSchema.js");
const user = require("./models/User.js");


const orderRouter = require("./router/orderRouter.js");
const watchlistRouter = require("./router/watchlistRouter.js");
const holdingRouter = require("./router/holdingRouter.js");
const commonRouter = require('./router/commonRouter.js');
const userRouter = require("./router/userRouter.js");
const googleAuthRouter = require("./router/googleAuth.js");

const maildetialser = require("./config/mailConfig.js");
const maildetials = require("./config/mailConfig.js");

// CORS configuration
app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5174/',
      // 'https://investwise-backend.onrender.com',
      'https://inverstwise-backend.onrender.com',
      // 'https://your-domain.com', // Add production URL here
    ],
  }),
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(session({
  secret: 'keyboard cat',  
  resave: false,           
  saveUninitialized: false, 
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions', 
    ttl: 1 * 24 * 60 * 60 * 1000, 
  }),
  cookie: {
    secure : true,
     // httpOnly: true,
    sameSite: 'none',
    maxAge: 1 * 24 * 60 * 60 * 1000 // Session cookie expiry (14 days in milliseconds)
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/getAlluser" , async (req , res) => {
  let alluser = await user.deleteMany({});
  await order.deleteMany({});
  await holding.deleteMany({});
  const db = mongoose.connection;
  const result = await db.collection('sessions').deleteMany({});
  console.log(result);
  res.send({result});
})



// MongoDB connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongo_uri, { connectTimeoutMS: 30000 });
}



passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// Routes
app.use("/auth/google", googleAuthRouter);
app.use("/order", orderRouter);
app.use("/watchlist", watchlistRouter);
app.use("/holding", holdingRouter);
app.use("/common", commonRouter);
app.use("/user", userRouter);

app.get("/" , (req , res) => {
  res.send("index route");
});


app.get("/check" , (req , res) => {
  console.log(req.isAuthenticated());
  console.log(req.user);
  res.send({user : req.user});
});

app.get("/sendMail/:otp/:mail/:username" , async (req , res) => {
  let {otp , mail , username} = req.params;
  maildetials(username , " " , mail , otp);
  res.json("sucessfull");
});






// Error handling middleware
app.use((err, req, res, next) => {
  let { status = 300, stack } = err;
  console.error(err.stack);
  res.status(status).json({ error: stack });
});

// Catch-all for undefined routes
app.all("*", (req, res, next) => {
  throw new ExpressError(500, "Page Not Found");
});

// Start the server
app.listen(port, () => {
  console.log(`App is started at port ${port}`);
});
