 import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import AllBlogs from "./views/AllBlogs";
import EditBlog from "./views/EditBlog";
import NewBlog from "./views/NewBlog";
import ReadBlog from "./views/ReadBlog";
import Signup from "./views/Signup";
import Login from "./views/Login"
 
  createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<AllBlogs />} />
      <Route path="/new" element={<NewBlog />} />
      <Route path="/edit/:id" element={<EditBlog />} />
      <Route path="/blog/:slug" element={<ReadBlog />} />
        <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="*"
        element={<h1 className="text-center mt-5">404 Not Found</h1>}
      />
    </Routes>
  </BrowserRouter>
);