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
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");

    const currentUser = getCurrentUser();
    if (!currentUser) {
      setShowLoginPopup(true);  
    } else {
      setUser(currentUser);
    }
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
        const newBlog = response.data.data;
        toast.success("Blog saved successfully 🎉");
        setTimeout(() => navigate(`/blog/${newBlog.slug}`), 1000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error creating blog");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-10 relative">
         {showLoginPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center w-[90%] sm:w-[420px]">
              <h2 className="text-2xl font-bold mb-3 text-gray-800">
                Please Login First
              </h2>
              <p className="text-gray-600 mb-6">
                You need to login before creating or publishing blogs.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => navigate("/login")}
                >
                  Go to Login
                </button>
                <button
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                  onClick={() => setShowLoginPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          📝 Create a New Blog
        </h1>

        {user ? (
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
            <input
              type="text"
              placeholder="Enter your blog title"
              className="border border-gray-300 p-3 w-full my-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 p-3 my-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {BLOG_CATEGORIES.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>

            <div className="mt-6">
              <MarkdownEditor
                value={content}
                onChange={(value) => setContent(value)}
                height="500px"
              />
            </div>

            <button
              className="bg-blue-600 text-white px-8 py-3 mt-6 rounded-lg hover:bg-blue-700 transition w-full font-semibold text-lg"
              type="button"
              onClick={saveBlog}
            >
              💾 Save Blog
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            Please login to create a new blog.
          </p>
        )}

        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}

export default NewBlog;
