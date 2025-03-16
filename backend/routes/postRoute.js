const router = require("express").Router();
const {verifyToken , verifyTokenAndAdmin ,verifyTokenAndPrivate, verifyTokenAndAdminAndHimself} = require("../middlewares/verifyToken");
const photoupload = require("../middlewares/photoUpload");
const {create_new_post, get_all_posts, get_single_posts, get_posts_count ,deletePostCtrl, UpdatePostCtrl, UpdatePostimageCtrl, toggleLikeCRTL} = require("../controllers/postController");
const validateObjectId = require("../middlewares/validateObjectId");



// Define a POST route to create new post
router.post("/",verifyToken,photoupload.single("image"),create_new_post);
// Define a GET route to get posts
router.get("/",get_all_posts);
// Define a GET route to get post count
router.get("/count",get_posts_count);
// Define a GET route to get single post
router.get("/:id",validateObjectId,get_single_posts);
// Define a DELETE route to delete single post
router.delete("/:id",validateObjectId,verifyToken,deletePostCtrl);
// Define a PUT route to Update single post
router.put("/:id",validateObjectId,verifyToken,UpdatePostCtrl);
// Define a PUT route to Update post image 
router.put("/update-image/:id", validateObjectId, verifyToken, UpdatePostimageCtrl);
// Define a PUT route to Update post image 
router.put("/like/:id", validateObjectId, verifyToken, toggleLikeCRTL);


module.exports = router; 