import {BrowserRouter , Routes , Route} from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home/Home"
import Login from "./pages/forms/Login";
import Register from "./pages/forms/register";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreatePost from "./pages/create-post/createPost";
import Posts from "./pages/Post-page/PostPage";
import PostDetails from "./pages/PostDetails/PostDetails";


function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes> 
        <Route path="/" element = {<Home/>}/>
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/posts" element={<Posts/>}/>
        <Route path="/posts/create-post" element={<CreatePost/>}/>
        <Route path="/posts/details/:id" element={<PostDetails/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/> 
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
