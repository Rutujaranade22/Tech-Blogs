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
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-blue-200 transition"
        >
          🧠 TechBlogs
        </Link>

        {/* Hamburger Menu (Mobile only) */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Navigation Links (Desktop) */}
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-200 font-medium">
            Home
          </Link>
          <Link to="/new" className="hover:text-blue-200 font-medium">
            New Blog
          </Link>
          <Link to="/readblogs" className="hover:text-blue-200 font-medium">
            My Blogs
          </Link>
          
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-blue-100">👋 {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-sm"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-blue-800 text-white p-4 flex flex-col gap-4">
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
          
          {/* Auth Buttons (Mobile) */}
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
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-sm text-center"
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
