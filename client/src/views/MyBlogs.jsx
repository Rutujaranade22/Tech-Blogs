import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import { getCurrentUser } from "../util";
import { Link } from "react-router";

function MyBlogs() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    if (currentUser) fetchMyBlogs(currentUser._id);
    else setLoading(false);
  }, []);

  const fetchMyBlogs = async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs?author=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBlogs(response.data.data || []);
    } catch (err) {
      console.error("Error fetching user's blogs:", err);
    } finally {
      setLoading(false);
    }
  };

   if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Please{" "}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>{" "}
            to view your blogs.
          </h2>
          <p className="text-gray-500">
            Once logged in, you’ll see all your created blogs here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
         <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            📝 {user.name}'s Blogs
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage and explore all the blogs you’ve created. You can edit or
            read them in detail anytime.
          </p>
        </div>

         {loading ? (
          <p className="text-center text-gray-500">Loading your blogs...</p>
        ) : blogs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                title={blog.title}
                author={blog.author}
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
          <div className="text-center text-gray-500 mt-10">
            <p>You haven’t written any blogs yet.</p>
            <Link
              to="/new"
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
            >
              ✍️ Write Your First Blog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
