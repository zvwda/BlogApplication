const fs = require("fs");
const path = require("path");
const async_handler = require("express-async-handler");
const {Posts , validate_create_post , validate_Update_post} = require("../models/Posts");
const {cloudinaryUploadImage, cloudinaryRemoveImage} = require("../utils/coudinary");
const { create } = require("domain");
const {Comment} = require("../models/Comments");

/**
 * @description create new post
 * @Route /api/posts
 * @method POST
 * @access private (only user)
 * */
module.exports.create_new_post = async_handler(async (req , res)=> {
       //validate image 
       if(!req.file){
          return res.status(400).json({message: "no image provided"})
       }
       
       //upload photo
       const image_path = path.join(__dirname , `../images/${req.file.filename}`);
       const result = await cloudinaryUploadImage(image_path);  
       //create new post and save it 
       const post = await Posts.create({
           title: req.body.title,
           discription:req.body.discription,
           category: req.body.category,
           user: req.user.id,
           image:{
              url: result.secure_url,
              publicid:result.public_id
           },        
       })
       //send response to client 
       res.status(201).json(post)
       //remove photo from the server
       fs.unlinkSync(image_path); 
});

/**
 * @description get all posts
 * @Route /api/posts
 * @method GET
 * @access public
 * */
module.exports.get_all_posts = async_handler(async (req , res)=> {
     const post_per_page  =  3;
     const {pageNumber , category} = req.query;

     let posts; 

     if(pageNumber){
        posts = await Posts.find()
            .skip((pageNumber - 1)*post_per_page)
            .limit(post_per_page).sort({createdAt: -1})
            .populate("user", ["-password"]);
     }
     else if(category){
        posts =  await Posts.find({category: category}).sort({createdAt: -1})
        .populate("user", ["-password"]);
     }
     else{
        posts =  await Posts.find().sort({createdAt: -1})
            .populate("user", ["-password"]);
     }
     res.status(200).json(posts);
});
/**
 * @description get single posts
 * @Route /api/posts/:id
 * @method GET
 * @access public
 * */
module.exports.get_single_posts = async_handler(async (req , res)=> {
    const post = await Posts.findById(req.params.id)
           .sort({createdAt: -1})
           .populate("user", ["-password"])
           .populate("comments");           
    if (!post){
        return res.status(404).json({message:"post not found"})
    }
     res.status(200).json(post);
});

/**
 * @description Get posts count
 * @Route /api/posts/count
 * @method GET
 * @access public
 */
module.exports.get_posts_count = async_handler(async (req, res) => {
    // Use countDocuments() to get the number of posts
    const count = await Posts.countDocuments(); 
    res.status(200).json({ count });
});

/**
 * @description delete post
 * @Route /api/posts/:id
 * @method delete
 * @access privete (only admin or owner of the post)
 */
module.exports.deletePostCtrl = async_handler(async (req, res) => {
    const post = await Posts.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ message: "post not found" });
    }

    if (req.user.isAdmin || req.user.id === post.user.toString()) {
        await Posts.findByIdAndDelete(req.params.id);
        await cloudinaryRemoveImage(post.image.publicid);

        // TODO: Delete all comments that belong to this post
         await Comment.deleteMany({postId: post._id});

        res.status(200).json({
            message: "post has been deleted successfully",
            postId: post._id,
        });
    } else {
        res.status(403).json({ message: "access denied, forbidden" });
    }
});

/**
 * @description Update post
 * @Route /api/posts/:id
 * @method PUT
 * @access privete (owner of the post)
 */
module.exports.UpdatePostCtrl = async_handler(async (req, res) => {
      //1- validation
      const {error} = validate_Update_post(req.body);
      if(error){
        return res.status(400).json({message: error.details[0].message})
      }
      //2- get the post from db and check 
      const post = await Posts.findById(req.params.id);
      if (!post){
        return res.status(400).json({message: "post not found"})
      }
      //3- check if this post belong to log in user 
      if(req.user.id !== post.user.toString()){
        return res.status(403).json({message: "u are not allawd"})
      }
      //4- update the post 
      const updatedPost =  await Posts.findByIdAndUpdate(req.params.id,{
        $set:{
            title: req.body.title,
            discription:req.body.discription,
            category: req.body.category,       
        }
      },{new : true}).populate("user",["-password"]);
     
    //5- Send response to the client 
    res.status(200).json(updatedPost);
});

/**
 * @description Update post image
 * @Route /api/posts/update-image/:id
 * @method PUT
 * @access private (owner of the post)
 */
module.exports.UpdatePostimageCtrl = async_handler(async (req, res) => {
  // 1- validation
  if (!req.file) {
    return res.status(400).json({ message: "No image provided" });
  }

  // 2- get the post from db and check  
  const post = await Posts.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // 3- check if this post belongs to the logged-in user 
  if (req.user.id !== post.user.toString()) {
    return res.status(403).json({ message: "You are not allowed to update this post" });
  }

  // 4- update the post image
  try {
    await cloudinaryRemoveImage(post.image.publicid); // Remove the old image

    const image_path = path.join(__dirname, `../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(image_path);

    if (!result || !result.secure_url || !result.public_id) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    // Update the post's image field in the database 
    const updatedPost = await Posts.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          image: {
            url: result.secure_url,
            publicid: result.public_id
          }
        }
      },
      { new: true }
    ).populate("user", ["-password"]);

    // 5- Send response to the client 
    res.status(200).json(updatedPost);

  } catch (error) {
    return res.status(500).json({ message: "An error occurred while updating the image", error: error.message });
  } finally {
    // Remove the photo from the server after the response is sent
    const image_path = path.join(__dirname, `../images/${req.file.filename}`);
    fs.unlink(image_path, (err) => {
      if (err) console.error("Failed to delete local image: ", err);
    });
  }
});

/**
 * @description Togle like
 * @Route /api/posts/like/:id
 * @method PUT
 * @access private (owner of the post)
 */
module.exports.toggleLikeCRTL = async_handler(async (req, res) => {
  const login_user = req.user.id; 
  const {id: postId} = req.params;  

  let post = await Posts.findById(postId);
   if(!post){
      return res.status(404).json({ message: "post not found" });
    }
    const ispostalreadyLiked = post.likes.find((user) => user.toString() === login_user);
    if(ispostalreadyLiked){
      post = await Posts.findByIdAndUpdate(postId , {
        $pull:{
          likes: login_user
        }
      }, {new : true});
    }
    else{
      post = await Posts.findByIdAndUpdate(postId , {
        $push:{
          likes: login_user
        }
      }, {new : true});
    }

    res.status(200).json(post);
});