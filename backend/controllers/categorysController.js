const async_handler = require("express-async-handler");
const {Category , validate_create_category} = require("../models/Category");
const {User} = require("../models/Users");
const { validate_create_comment } = require("../models/Comments");

/**
 * @description create new category
 * @Route /api/catrgory
 * @method POST
 * @access private (only admin)
 * */
module.exports.create_new_category = async_handler(async (req , res)=> {
    //validate create category
    const {error} =  validate_create_category(req.body);
    if(error){
     return res.status(400).json({massage: error.details[0].message});
    }
    const category = await Category.create({
       title: req.body.title,
       user: req.user.id,
        });
     //send response to client 
     res.status(201).json(category);
});

/**
 * @description get all catrgorys
 * @Route /api/catrgory
 * @method Get
 * @access private (only admin)
 * */

module.exports.get_all_catrgorys = async_handler(async (req , res)=> {
    const catrgory = await Category.find();
    res.status(200).json(catrgory);
 });

 /**
 * @description delete catrgory
 * @Route /api/catrgory/:id 
 * @method delete
 * @access private (only admin)
 * */

module.exports.delete_catrgory = async_handler(async (req , res)=> {
    const catrgory = await Category.findById(req.params.id);
    if(!catrgory){
       return res.status(404).json({massage: "catrgory is not found"});
    }
 
    if(req.user.isAdmin){
       const catrgory = await Category.findByIdAndDelete(req.params.id);
       res.status(200).json({message:"catrgory has been deleted"});
    }else{
       res.status(200).json({message:"u dont have access, not allowed"});
    }
 });