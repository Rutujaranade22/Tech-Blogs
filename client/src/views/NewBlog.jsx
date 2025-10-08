import MarkdownEditor from "@uiw/react-markdown-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { BLOG_CATEGORIES } from "./../constants.js";
import { getCurrentUser } from "./../util.js";
import { useNavigate } from "react-router";

function NewBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // ✅ for redirect

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    setUser(getCurrentUser());
  }, []);

  const saveBlog = async () => {
    if (!title || !content) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs`,
        {
          title,
          content,
          category,
          author: user?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response?.data?.success) {
        const newBlog = response.data.data; // ✅ blog created in backend
        toast.success("Blog saved successfully 🎉");

        // ✅ Redirect to blog reading page using slug
        setTimeout(() => {
          navigate(`/blog/${newBlog.slug}`);
        }, 1000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error creating blog");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">📝 Create New Blog</h1>

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
        onChange={(value) => {
          setContent(value);
        }}
        height="500px"
      />

      <button
        className="bg-blue-600 text-white px-5 py-2 mt-4 rounded-md hover:bg-blue-700 transition"
        type="button"
        onClick={saveBlog}
      >
        Save Blog
      </button>

      <Toaster />
    </div>
  );
}

export default NewBlog;
