const mongoose = require("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to DB");
    } catch (error) {
         console.log("connection faild to MongoDB" , error);
    }
}