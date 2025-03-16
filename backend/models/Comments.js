const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const Joi = require("joi");


//comment schema 
const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    text:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
},{
    timestamps: true,
});

//comment model
const Comment = mongoose.model("Comment" , CommentSchema);

//validate Create comment 
function validate_create_comment(obj){
    const schema = Joi.object({
        postId: Joi.string().required(),
        text : Joi.string().trim().required(),
    });
    return schema.validate(obj);
}

//validate Update comment 
function validate_Update_comment(obj){
    const schema = Joi.object({
        text : Joi.string().trim().required(),      
    });
    return schema.validate(obj);
}

module.exports = {
    Comment,
    validate_create_comment,
    validate_Update_comment,
}