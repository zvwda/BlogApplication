import {Link} from "react-router-dom";


const HeaderRight = () => {
    return (  
        <div className="header-right">
        <Link to="/login" className="header-right-link">
            <i className="bi bi-box-arrow-in-right">
                <span>Login</span>
            </i>
        </Link>
        <Link to="/register" className="header-right-link">
            <i className="bi bi-person-plus">
                <span>Register</span>
            </i>
        </Link>
    </div>
    );
}
 
export default HeaderRight;