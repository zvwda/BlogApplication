import Postitem from "./postItem"
import "./posts.css";

const postList = ({posts}) =>
     {
    return ( 
        <div className="post-list">
            {posts.map(item => <Postitem  post={item} key={item._id}/>)}
        </div>
     );
}
export default postList;