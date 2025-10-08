import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import AllBlogs from "./views/AllBlogs";
import EditBlog from "./views/EditBlog";
import Login from "./views/Login";
import NewBlog from "./views/NewBlog";
import ReadBlog from "./views/ReadBlog";
import Signup from "./views/Signup";
import MyBlogs from "./views/MyBlogs";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AllBlogs />} />
      <Route path="/new" element={<NewBlog />} />
      <Route path="/edit/:slug" element={<EditBlog />} />
      <Route path="/blog/:slug" element={<ReadBlog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/readblogs" element={<MyBlogs />} />
      <Route
        path="*"
        element={<h1 className="text-center mt-5">404 Not Found</h1>}
      />
    </Routes>
  </BrowserRouter>
);