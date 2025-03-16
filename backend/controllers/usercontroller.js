const async_handler = require("express-async-handler");
const {User , validateUpdateUser} = require("../models/Users");
const {Posts} = require("../models/Posts");
const {Comment} = require("../models/Comments");

const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const {cloudinaryRemoveImage , cloudinaryUploadImage , cloudinaryRemoveMultiImage} = require("../utils/coudinary");

/**
 * @description get all users profils 
 * @Route /api/users/profile
 * @method GET
 * @access private (only admin)
 * */
module.exports.getAllUsersProfiles = async_handler(async (req , res) => {
     const users = await User.find().select("-password").populate("posts");
     res.status(200).json(users);   
});
//---------------------------------------------------------------------------------------
/**
 * @description get user profils 
 * @Route /api/users/profile/:id
 * @method GET
 * @access public 
 * */
module.exports.getUsersProfile = async_handler(async (req , res) => {
    const user = await User.findById(req.params.id).select("-password").populate("posts");
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    res.status(200).json(user);   
});
//---------------------------------------------------------------------------------------
/**
 * @description Update user profils 
 * @Route /api/users/profile/:id
 * @method PUT
 * @access private
 * */
module.exports.UpdateUserProfile = async_handler(async (req , res) => {
    const {error} = validateUpdateUser(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
    if(req.body.password){
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password , salt);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id , {
        $set:{
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio
        }
    }, {new:true}).select("-password");

    res.status(200).json(updatedUser);
});
//---------------------------------------------------------------------------------------
/**
 * @description get users count  
 * @Route /api/users/count
 * @method GET
 * @access private (only admin)
 * */
module.exports.getUserscount = async_handler(async (req, res) => {
    const count = await User.countDocuments();  // Use countDocuments for MongoDB
    res.status(200).json({ count });
});
//---------------------------------------------------------------------------------------
/**
 * @description profile photo upload  
 * @Route /api/users/profile/profile-photo-upload
 * @method POST
 * @access private (only user)
 * */
module.exports.profile_photo_upload = async_handler(async (req , res) => {
    // validation
    if (!req.file) {
        return res.status(400).json({ message: "No file provided" });
    }

    // get the path of the image 
    const imagepath = path.join(__dirname, `../images/${req.file.filename}`);

    // upload to Cloudinary
    const result = await cloudinaryUploadImage(imagepath);
    console.log(result);

    // get user from DB
    const user = await User.findById(req.user.id);
    //delete the old profile photo 
    if(user.profilephoto.publicid !== null){
        await cloudinaryRemoveImage(user.profilephoto.publicid);
    }

     //change photo in db
     user.profilephoto ={
        url: result.secure_url,
        publicid: result.public_id, 
    }
    await user.save();

    // send response 
    res.status(200).json({
        message: "Your photo was uploaded successfully",
        profilephoto: {
            url: result.secure_url,
            publicid: result.public_id,
        },
    });

    // remove the image from the server 
    fs.unlinkSync(imagepath);
});
//---------------------------------------------------------------------------------------
/**
 * @description delete user  
 * @Route /api/users/profile/:id
 * @method delete
 * @access private (only user)
 * */
module.exports.deleteUserProfile = async_handler(async (req , res)=> {
        //find user and validate 
        const user = await User.findById(req.params.id);
         if(!user){
             return res.status(404).json({message:"User Not Found"});  
        }
        //get all posts from db
        const posts = await Posts.find({user : user._id});
        //get all public ids of user posts 
        const publicids = posts?.map((post) => post.image.publicid);
        //delete all from cloudinary 
        if(publicids?.length > 0){
            await cloudinaryRemoveMultiImage(publicids);
        }
        //delete profile photo from cloudinary 
        await cloudinaryRemoveImage(user.profilephoto.publicid);
        
        //delete user posts & comments
        await Posts.deteteMany({user: user._id})
        await Comment.deleteMany({user: user._id});

        //remove user from DB
        await User.findByIdAndDelete(req.params.id);
        //send response
        res.status(200).json({message: "your profile has been deleted"});
});