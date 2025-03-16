const router = require("express").Router();
const { getAllUsersProfiles , getUsersProfile ,UpdateUserProfile ,getUserscount ,profile_photo_upload, deleteUserProfile } = require("../controllers/usercontroller");
const {verifyToken , verifyTokenAndAdmin ,verifyTokenAndPrivate, verifyTokenAndAdminAndHimself} = require("../middlewares/verifyToken");
const validate_Object_ID = require("../middlewares/validateObjectId");
const photoupload = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
 
// Define a GET route to fetch all user profiles
router.get("/profile",verifyTokenAndAdmin,getAllUsersProfiles);

// Define a GET route user profiles
router.get("/profile/:id",validate_Object_ID,getUsersProfile);

// Define a PUT route Update user profiles
router.put("/profile/:id",validate_Object_ID,verifyTokenAndPrivate,UpdateUserProfile);

// Define a GET route users count
router.get("/count",verifyTokenAndAdmin,getUserscount);

// Define a POST route upload profile photo 
router.post("/profile/profile-photo-upload",verifyToken,photoupload.single("image"),profile_photo_upload);

router.delete("/profile/:id", validateObjectId , verifyTokenAndAdminAndHimself, deleteUserProfile);


module.exports = router; 
