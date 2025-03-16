import "./Home.css"; 
import PostList from "../../components/posts/postlist";
import Sidebar from "../../components/sidebar/sidebar"
import {posts ,categories} from "../../dummyData";
import { Link } from "react-router-dom";

const Home = () => {
    return ( 
        <section className="home"> 
            <div className="home-hero-header">
                <div className="home-hero-header-layout">
                    <h1 className="home-title">Welcom to Blog</h1>
                </div>
            </div>
            <div className="home-latest-posts">latest posts</div>
            <div className="home-container">
            <PostList posts={posts.slice(0,3)}/>
            <Sidebar  categories={categories}/>
            </div>
            <div className="home-see-posts-link">
                <Link to="/posts" className="home-link">
                    See All Posts 
                </Link>
            </div>
        </section>
     );
}
 
export default Home;