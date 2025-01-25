const express = require("express");
const router = express.Router({mergeParams : true});
// const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const  GoogleStrategy = require('passport-google-oauth20').Strategy;
const user = require("../models/User.js");
const sendMail = require("../config/mailConfig.js");



passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
async (accessToken, refreshToken , profile, cb) => {
  let userDetails = await user.findOne({email : profile.emails[0].value});
  if(userDetails){
     
    // sending mail
    // sendMail(userDetails.username , "signIn" , userDetails.email);

    return cb(null , userDetails);
  }
  else{
    const newUser = new user({
      username : profile.name.givenName,
      email: profile.emails[0].value, // User's email from Google
      profilepic: profile.photos[0]?.value, // Profile picture from Google
      isProfit: false, // Default value
      totalStock: 0, // Default value
      netgainOrloss: 0, // Default value
      totalInvestment: 0, // Default value
      acceptedProfit: 0, // Default value
      balance: 0, // Default value
      createdAt: Date.now(),
    });
    const savedUser = await newUser.save();

    // sendMail(savedUser.username , "signUp" , savedUser.email);

    return cb(null, savedUser); 
  }
}
));


passport.serializeUser((user, done) => {
  done(null, user._id); // Store the user ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const userDetails = await user.findById(id);
    done(null,  userDetails); // Attach the user to the session
  } catch (err) {
    done(err);
  }
});



router.get('/', passport.authenticate('google', { scope: ['profile' , 'email'] }));

    router.get('/callback', 
        passport.authenticate('google' , {failureRedirect : "http://localhost:5173/notFound"}),
        function(req, res) {
          res.redirect("http://localhost:5173/");
        });


module.exports = router;

