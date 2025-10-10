import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard.jsx";
import Navbar from "../components/Navbar.jsx";
import { getCurrentUser } from "./../util.js";
import { Link } from "react-router"; 
import Footer from "../components/Footer.jsx";
function AllBlogs() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch blogs dynamically from backend
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
      if (response.data?.data) {
        setBlogs(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUser(getCurrentUser());
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        {/* Greeting Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            {user ? `Welcome back, ${user.name}! 👋` : "Welcome to Tech Blogs 🚀"}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover insightful blogs on programming, web development, and
            technology. Learn from professionals and share your own knowledge
            with the world.
          </p>

           <div className="mt-6">
            <Link
              to="/new"
              className="bg-blue-900 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md transition"
            >
              ✍️ Write a Blog
            </Link>
          </div>
        </div>

        {/* Blog Section */}
        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : blogs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                title={blog.title}
                author={blog.author?.name || "Unknown"}
                updatedAt={blog.updatedAt}
                publishedAt={blog.publishedAt}
                status={blog.status}
                category={blog.category}
                slug={blog.slug}
                viewCount={blog.viewCount}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>No blogs available yet. Be the first to create one!</p>
          </div>
        )}

        {/* Info*/}
        <div className="mt-16 text-center bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🧠 How to Write a Great Blog
          </h2>
          <p className="text-gray-600 mb-4">
            Writing blogs helps you share your knowledge and improve your skills. 
            Here are some quick tips to get started:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-left max-w-md mx-auto space-y-2">
            <li>Pick a topic you’re passionate about.</li>
            <li>Keep your title short, clear, and catchy.</li>
            <li>Use examples and code snippets to explain better.</li>
            <li>Add a conclusion summarizing your thoughts.</li>
            <li>Don’t forget to proofread before publishing!</li>
          </ul>

          <p className="mt-6 text-gray-600">
            Once you're ready, click the{" "}
            <strong>"Write a Blog"</strong> button above to start writing your first post.
          </p>
        </div>
      </div>
 <Footer />    </div>
  );
}

export default AllBlogs;
