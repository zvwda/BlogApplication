import "./PostPage.css"
import Postlist from "../../components/posts/postlist"
import Sidebar from "../../components/sidebar/sidebar"
import Pagination from "../../components/pagination/pagination" 
import {posts ,categories} from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const PostPage = () => {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    return ( 
        <>
        <section className="posts-page">
            <Postlist posts={posts}></Postlist> 
            <Sidebar categories={categories}></Sidebar>
        </section>
        <Pagination></Pagination>
        </>
     );
}
export default PostPage; 