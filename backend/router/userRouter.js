const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router({mergeParams : true});
const userController = require("../Controller/userController");
const middleware = require("../middleware.js");
const passport = require("passport");


router.get("/isLogin",  (req , res) => {
  console.log("isLogin");
  console.log(req.user);
    res.json({user : req.user});
  });
  

router.post("/signUpInfo" , middleware.validateuserSchema , wrapAsync(userController.userSignUp));

router.post("/login" , passport.authenticate('local' , { failureRedirect: '/login' }) , userController.login);

router.get("/logout" , userController.logout);
router.post("/balance" , wrapAsync(userController.addMoney));

module.exports = router;