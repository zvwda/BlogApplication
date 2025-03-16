const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const Joi = require("joi");


//post schema 
const Postschema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200,
    },
    discription:{
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    image:{
        type: Object,
        default: {
            url:"",
            publicid: null,
        }
    },
    likes :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
    
},{timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
}
);

//populate comment for posts
Postschema.virtual("comments" , {
    ref: "Comment",
    foreignField: "postId",
    localField: "_id"
});

const Posts = mongoose.model("Post" , Postschema);

//validate Create Post 
function validate_create_post(obj){
    const schema = Joi.object({
        title : Joi.string().trim().min(2).max(200).required(),
        discription: Joi.string().trim().min(2).required(),
        category: Joi.string().trim().required(),
    });
    return schema.validate(obj);
}

//validate Update Post 
function validate_Update_post(obj){
    const schema = Joi.object({
        title : Joi.string().trim().min(2).max(200),
        discription: Joi.string().trim().min(2),
        category: Joi.string().trim(),
    });
    return schema.validate(obj);
}


module.exports = {
    Posts,
    validate_create_post,
    validate_Update_post,
}