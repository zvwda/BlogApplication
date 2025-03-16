const async_handler = require("express-async-handler");
const {Comment , validate_create_comment , validate_Update_comment} = require("../models/Comments");
const {User} = require("../models/Users");

/**
 * @description create new comment
 * @Route /api/comment
 * @method POST
 * @access private (only user)
 * */

module.exports.create_new_comment = async_handler(async (req , res)=> {
     //validate create comment
     const {error} =  validate_create_comment(req.body);
     if(error){
      return res.status(400).json({massage: error.details[0].message});
     }

     const profile = await User.findById(req.user.id);

     const comment = await Comment.create({
        postId: req.body.postId,
        text: req.body.text,
        user: req.user.id,
        username: profile.username,
     });
      //send response to client 
      res.status(201).json(comment);
});

/**
 * @description get all comments
 * @Route /api/comment
 * @method Get
 * @access private (only admin)
 * */

module.exports.get_all_comments = async_handler(async (req , res)=> {
   const comment = await Comment.find().populate("user");
   res.status(200).json(comment);
});

/**
 * @description delete comment
 * @Route /api/comments/:id 
 * @method delete
 * @access private (only admin or owner of comment)
 * */

module.exports.delete_comment = async_handler(async (req , res)=> {
   const comment = await Comment.findById(req.params.id);
   if(!comment){
      return res.status(404).json({massage: "comment is not found"});
   }

   if(req.user.isAdmin || req.user.id === comment.user.toString()){
      const comment = await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"comment has been deleted"});
   }else{
      res.status(200).json({message:"u dont have access, not allowed"});
   }
});

/**
 * @description update comment
 * @Route /api/comments/:id 
 * @method post
 * @access private (only owner of comment)
 * */

module.exports.update_comment = async_handler(async (req , res)=> {
   //validate create comment
   const {error} =  validate_Update_comment(req.body);
   if(error){
    return res.status(400).json({massage: error.details[0].message});
   }  
   const comment = await Comment.findById(req.params.id);
   if (!comment){
      return res.status(404).json({massage: "comment is not found"});
   }
   if(req.user.id === comment.user.toString()){
      const comment = await Comment.findByIdAndUpdate(req.params.id , {
         $set:{
            text: req.body.text,
         }
      } , {new : true});
      res.status(200).json({message:"comment has been updated"});
   }else{
      res.status(200).json({message:"u dont have access, not allowed"});
   } 
});
