import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getCurrentUser } from "./../util";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900  to-blue-900 text-gray-100 shadow-lg ">
      <div className="container mx-auto flex justify-between items-center p-4">
         <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-white hover:text-blue-300 transition"
        >
          🧠 TechBlogs
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="sm:hidden focus:outline-none text-blue-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Navigation Links (Desktop) */}
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-300 font-medium transition">
            Home
          </Link>
          <Link to="/new" className="hover:text-blue-300 font-medium transition">
            New Blog
          </Link>
          <Link
            to="/readblogs"
            className="hover:text-blue-300 font-medium transition"
          >
            My Blogs
          </Link>
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-blue-200 font-medium">
                👋 {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-900 hover:bg-blue-600 px-4 py-2 rounded-md text-sm transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-900 hover:bg-blue-600 px-4 py-2 rounded-md text-sm transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-gradient-to-b from-blue-950 to-blue-900 text-white p-4 flex flex-col gap-4 shadow-inner">
          <Link
            to="/"
            className="hover:text-blue-300 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/new"
            className="hover:text-blue-300 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            New Blog
          </Link>
          <Link
            to="/readblogs"
            className="hover:text-blue-300 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            My Blogs
          </Link>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm text-center"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
