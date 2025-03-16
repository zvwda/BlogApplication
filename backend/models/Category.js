const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const Joi = require("joi");


//category schema 
const CategorySchema = new mongoose.Schema({   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
},{
    timestamps: true,
});

//category model
const Category = mongoose.model("Category" , CategorySchema);

//validate Create category 
function validate_create_category(obj){
    const schema = Joi.object({
        title: Joi.string().trim().required(),
    });
    return schema.validate(obj);
}


module.exports = {
    Category,
    validate_create_category,
}