import {Link, useParams} from "react-router-dom"
import {posts} from"../../dummyData"
import "./postDetails.css"

const PostDetails = () => {
    const {id} =  useParams();
    const post = posts.find(p => p._id === parseInt(id));
    
    return (
        <section className="Post-details"> 
            <div className="post-details-image-erapper">
                <img src={post.image} alt="post image" className="post-datils-image"/>
                <form action="" className="update-post-image">
                    <lable htmlFor="file" className="update-post-laple">
                        <i className="bi bi-image-fill"></i>
                        Select New Image
                    </lable>
                    <input type="file" name="file" id="file"/>
                    <button type="submit">upload</button>
                </form>
            </div>
            <h1 className="post-details-title">{post.title}</h1>
            <div className="post-details-user-info">
                <img src={post.user.image} alt="" className="post-details-user"/>
                <div className="post-details-user">
                    <strong>
                        
                        <Link to="/profile/1">{post.user.username}</Link>
                    </strong>
                    <span>{post.createdAt}</span>
                </div>
            </div>
                <p className="post-detils-desc">
                    {post.description}
                    Lorem ipsum dolor sit 
                    amet consectetur 
                    adipisicing elitEum amet magni suscipit necessitatibus inventore.
                     Animi ab tenetur saepe, nihil, 
                    ad magnam soluta eius aliquid eligendi exercitationem ullam quos voluptates
                     repellendus?Lorem ipsum dolor sit 
                    amet consectetur 
                    adipisicing elitEum amet magni suscipit necessitatibus inventore.
                     Animi ab tenetur saepe, nihil, 
                    ad magnam soluta eius aliquid eligendi exercitationem ullam quos voluptates
                     repellendus?
                </p>
                <div className="postdetailsiconwrapper">
                    <div> 
                      <i className="bi bi-hand-thumbs-up"></i>
                      <small>{post.likes.length} likes</small>
                    </div>
                    <div>
                      <i className="bi bi-pencil-square"></i>
                      <i className="bi bi-trash-fill"></i>
                    </div> 
                </div>
            
        </section>
      );
}
 
export default PostDetails;