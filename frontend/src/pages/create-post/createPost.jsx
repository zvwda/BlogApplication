import { useState } from "react";
import "./create-post.css"
import {toast , ToastContainer} from "react-toastify"; 

const CreatePost = () => {
    const [title , setTitle] = useState("");
    const [description , setdescription] = useState("");
    const [category , setcategory] = useState("");
    const [file , setfile] = useState(null);

    //Form Submit handler 
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(title.trim() === "")return toast.error("post Title is required");
        if(description.trim() === "")return toast.error("post description is required");
        if(category.trim() === "")return toast.error("post category is required");
        if(!file)return toast.error("post image is required");
 
        const formdata = new FormData();
        formdata.append("image" , file);        

        console.log({title , description , category, file})
        
    }

    return (
        <section className="create-post">
            <ToastContainer position="top-center"></ToastContainer>
            
            <h1 className="creat-post-title">
                Create New Post
            </h1>
            <form className="create-post-form" onSubmit={formSubmitHandler}>
                <input type="text" placeholder="Post Title"
                 className="createpostinput"
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                />
                <select 
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}
                className="createpostinput">
                     <option value="music">music</option>
                     <option value="music">coffe</option>                     
                </select>
                <textarea className="createposttextarea" 
                rows="5" placeholder="Post Description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                ></textarea>
                <input type="file" name="file" id="file" className="createpostupload"
                  onChange={(e) => setfile(e.target.files[0])}
                />
                <button type="submit" className="createpostbutton">Create</button>
            </form>
        </section>
    );
}
export default CreatePost;