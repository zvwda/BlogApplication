const express = require("express");
const connectToDb = require("./config/connect_to_DB");
const authroutepath =  require("./routes/authroute");
const usersroutepath =  require("./routes/usersRoute");
const postsroutepath =  require("./routes/postRoute");
const commentsroutepath =  require("./routes/commentRoute");
const categorysroutepath =  require("./routes/categorysRoute");
const { errorHandler, notFound } = require("./middlewares/error");

require("dotenv").config();

//connecion to Db
connectToDb();

//init app
const app =  express();

//middlewares
app.use(express.json());

//routes
app.use("/api/auth" , authroutepath);
app.use("/api/users" , usersroutepath);
app.use("/api/posts" , postsroutepath);
app.use("/api/comments" , commentsroutepath);
app.use("/api/category" , categorysroutepath);

// Then use the middleware
app.use(notFound);
app.use(errorHandler);

//runing server 
const port =  process.env.PORT;
app.listen( port ,()=> {
    console.log(`server is running on port ${port}`)
});