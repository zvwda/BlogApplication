const router = require("express").Router();
const {verifyToken , verifyTokenAndAdmin ,verifyTokenAndPrivate, verifyTokenAndAdminAndHimself} = require("../middlewares/verifyToken");
const {create_new_category, get_all_catrgorys, delete_catrgory} = require("../controllers/categorysController");
const validateObjectId = require("../middlewares/validateObjectId");


// Define a POST route to create new category
router.post("/",verifyTokenAndAdmin,create_new_category);
// Define a Get route to get all category
router.get("/",get_all_catrgorys);
// Define a delete route to delete category
router.delete("/:id",validateObjectId,verifyTokenAndAdmin,delete_catrgory);

module.exports = router; 