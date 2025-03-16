const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const Joi = require("joi");
//User schema 
const Userschema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    profilephoto:{
        type: Object,
        default: {
            url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            publicid: null,
        }
    },
    bio:{
        type: String,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
    toJSON:{virtual: true},
    toObject:{virtuals: true}
});

//populat posts that belongs to this user 
Userschema.virtual("posts",{
    ref: "Post",
    foreignField: "user",
    localField: "_id",
})

//generate Auth token
Userschema.methods.generateAuthToken = function(){
   return jwt.sign({id:this._id , isAdmin: this.isAdmin},process.env.JWT_PASSWORD);
}

//user modle
const User = mongoose.model("User",Userschema);

//validate register 
function validateregister(obj){
    const schema =  Joi.object({
        username: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}

//validate login 
function validatelogin(obj){
    const schema =  Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}

//validate Update User 
function validateUpdateUser(obj){
    const schema =  Joi.object({
        username: Joi.string().trim().min(5).max(100),
        password: Joi.string().trim().min(8),
        bio: Joi.string().trim().min(8),
    });
    return schema.validate(obj);
}



module.exports = {
    User,
    validateregister,
    validatelogin,
    validateUpdateUser,
}