import { Link } from "react-router-dom";
import "./posts.css";

const postItem = ({post , key}) => {
    return ( <div className="post-item">
        <div className="post-item-image">
            <img src={post.image} alt="post image" className="imgpost-item-image"></img>
        </div>
        <div className="post-item-info-wrapper">
             <div className="post-item-info">
                <div className="post-item-auther">
                    <strong>Auther:</strong>
                    <Link className="post-item-auther--" to="/profile/">{post.user.username}</Link>
                </div>
                <div className="post-item-date">
                    {new Date(post.createdAt).toDateString()}
                </div>
             </div>
             <div className="post-item-details">
                <h4 className="post-item-title">{post.title}</h4>
                <Link className="post-item-category" to={`/post/category/${post.category}`}>
                {post.category}
                </Link>
             </div>
             <p className="post-item-description">
                {post.description}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Culpa dolor sint, incidunt reiciendis expedita sunt dolorum
                 quasi accusantium mollitia debitis sapiente.
                 Perferendis porro ipsum laborum illo dicta autem consequatur eius?
                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Culpa dolor sint, incidunt reiciendis expedita sunt dolorum
                 quasi accusantium mollitia debitis sapiente.
                 Perferendis porro ipsum laborum illo dicta autem consequatur eius?
                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Culpa dolor sint, incidunt reiciendis expedita sunt dolorum
                 quasi accusantium mollitia debitis sapiente.
                 Perferendis porro ipsum laborum illo dicta autem consequatur eius?
                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Culpa dolor sint, incidunt reiciendis expedita sunt dolorum
                 quasi accusantium mollitia debitis sapiente.
                 Perferendis porro ipsum laborum illo dicta autem consequatur eius?
             </p>
             <Link className="post-item-link" to={`/posts/details/${post._id}`}>
              Read More...
             </Link>
        </div>
        </div> );
}
export default postItem;