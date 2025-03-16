const router = require("express").Router();
const {verifyToken , verifyTokenAndAdmin ,verifyTokenAndPrivate, verifyTokenAndAdminAndHimself} = require("../middlewares/verifyToken");
const {create_new_comment, get_all_comments, delete_comment, update_comment} = require("../controllers/commentController");
const validateObjectId = require("../middlewares/validateObjectId");


// Define a POST route to create new comment
router.post("/",verifyToken,create_new_comment);
// Define a Get route to get all comment
router.get("/",verifyTokenAndAdmin,get_all_comments);
// Define a delete route to delete comment
router.delete("/:id",validateObjectId,verifyToken,delete_comment);
// Define a put route to update comment
router.put("/:id",validateObjectId,verifyToken,update_comment);



module.exports = router; 