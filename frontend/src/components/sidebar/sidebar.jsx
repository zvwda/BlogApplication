import { Link } from "react-router-dom";
import "./sidebar.css"

const sidebar = ({categories}) => {
    return (  
        <div className="sidebar">
         <h5 className="sidebar-title">CATEGORIES</h5>
         <ul className="sidebar-links">
            {categories.map(category => 
                <Link className="sidebar-link"
                key={category._id}
                to={`/posts/categories/${category.title}`}>
                    {category.title}
                </Link>
            )}
         </ul>
        </div>
    );
}
 
export default sidebar;