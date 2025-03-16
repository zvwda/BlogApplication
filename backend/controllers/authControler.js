const async_handler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {User,validateregister,validatelogin} = require("../models/Users")

/**
 * @description register new user 
 * @Route /api/auth/register
 * @method POST
 * @access public
 * */
module.exports.registerUserCtrl = async_handler(async (req , res) => {
       ///validation user data
       const {error} = validateregister(req.body);
       if(error){
        return res.status(400).json({message:error.details[0].message});
       }
       
       ///is this user already exists
       let user = await User.findOne({email: req.body.email});
       if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    

       ///hashing the password
       const salt = await bcrypt.genSalt(10);
       const hashpassword = await bcrypt.hash(req.body.password , salt);
        
       ///new user and save it to Db
       user = new User({
        username: req.body.username,
        email: req.body.email, 
        password: hashpassword,
       })
       await user.save();
    
       ///send response to client
       res.status(201).json(user); 
});

/**
 * @description log in as a user 
 * @Route /api/auth/login
 * @method POST
 * @access public
 * */
module.exports.loginUserCtrl = async_handler(async (req , res)=>{
     //1- login validation
     const {error} = validatelogin(req.body);
     if(error){
      return res.status(400).json({message:error.details[0].message});
     }
     //2- is user exist in database
     const user = await User.findOne({email: req.body.email});
     if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }
     //3- check the password
    const ispasswordmatch = await bcrypt.compare(req.body.password , user.password);
    if (!ispasswordmatch) {
        return res.status(400).json({ message: "invalid email or password" });
      }
     //4- generate new token(JWT)
     const token = user.generateAuthToken(); 
     res.status(200).json({
        _id: user.id,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilephoto,
        token,
     })
     //5- response to the client 
     res.status(201).json(user); 
})


