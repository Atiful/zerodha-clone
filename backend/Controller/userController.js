const user = require("../models/User.js");
const sendMail = require("../config/mailConfig.js");

module.exports.userSignUp = async(req , res , error) => {
    let [formData] = req.body;
    let registerUser = await user.register(formData , formData.password);
    if(registerUser){
        // used to send mail
        
        sendMail(formData.username , "signUp", formData.email);

    req.login(registerUser , (error) => {
        return res.json({registerUser , success : true , error : null});
    });
    }
    else{
      next(error);
    }
};

module.exports.login =  (req , res) => {
    sendMail(req.user.username , "signIn", req.user.email);
    res.json({user : req.user});
};

module.exports.logout = (req, res) => {
        req.logout((error) => {
            if (error) {
                return res.json({ success: false, message: "There is a problem in logout" });
            }
        });
        return res.json({ success: true, message: "User logged out successfully" });
};


module.exports.addMoney = async (req , res) => {
    const { isLogin, userDetails, addMoney } = req.body;
    if(isLogin){
  let findUser = await user.findByIdAndUpdate(userDetails._id , {$inc : {balance : addMoney}} , {new : true});
  return res.json({user : findUser});
    }
    else{
        return res.json({error : "user not login"});
    }
}
