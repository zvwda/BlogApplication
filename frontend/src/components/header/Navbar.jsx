import {Link} from "react-router-dom";

const Navbar = ({toggle , setToggle}) => {
    return ( 
        <nav style={{clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)"}} className="navbar">
        <ul className="nav-links">
            <Link to="/" onClick={()=> setToggle(false)} className="nav-link">
                <i className="bi bi-house"> Home</i>
             </Link>
             <Link to="/posts" onClick={()=> setToggle(false)} className="nav-link">
                <i className="bi bi-stickies"> Posts</i>
                </Link>
            <Link to="/posts/create-post" onClick={()=> setToggle(false)}  className="nav-link">
                <i className="bi bi-journal-plus"> Create</i>
             </Link>
            <Link to="/admin-dashboard" onClick={()=> setToggle(false)} className="nav-link">
                <i className="bi bi-person-check"> Admin Dashboard</i>
             </Link>
        </ul>
    </nav>
     );
}
 
export default Navbar;      