import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Navbar from "../components/Navbar";
import { BLOG_CATEGORIES } from "./../constants.js";
import { getCurrentUser } from "./../util.js";
import MarkdownEditor from "@uiw/react-markdown-editor";
import toast, { Toaster } from "react-hot-toast";

function EditBlog() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    fetchBlogDetails();
  }, []);

  //  Fetch existing blog data
  const fetchBlogDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`
      );
      const blog = response.data.data;
      setTitle(blog.title);
      setCategory(blog.category);
      setContent(blog.content);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load blog details");
    }
  };

  // Update blog
  const updateBlog = async () => {
    if (!title || !content) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`,
        { title, category, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Blog updated successfully 🎉");
        setTimeout(() => {
          navigate(`/blog/${slug}`);  
        }, 1000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error updating blog");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Blog</h1>

      <input
        type="text"
        placeholder="Blog Title"
        className="border p-2 w-full my-4 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 my-4 rounded"
      >
        {BLOG_CATEGORIES.map((cate) => (
          <option key={cate} value={cate}>
            {cate}
          </option>
        ))}
      </select>

      <MarkdownEditor
        value={content}
        onChange={(value) => setContent(value)}
        height="500px"
      />

      <button
        className="bg-green-600 text-white px-5 py-2 mt-4 rounded-md hover:bg-green-700 transition"
        onClick={updateBlog}
      >
        💾 Save Changes
      </button>

      <Toaster />
    </div>
  );
}

export default EditBlog;
