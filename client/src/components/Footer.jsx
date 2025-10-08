import { Github, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900 text-gray-200 pt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* 1️⃣ Brand Info - Left */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">🧠 TechBlogs</h2>
          <p className="text-blue-200 text-sm leading-relaxed">
            A platform for developers to share, learn, and grow together.
            <br />
            Built with ❤️ using MERN Stack.
          </p>

          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:scale-110 transition"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:scale-110 transition"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:scale-110 transition"
            >
              <Youtube size={20} />
            </a>
            <a
              href="mailto:your@email.com"
              className="hover:text-white hover:scale-110 transition"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* 2️⃣ Quick Links - Middle */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-blue-300 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/new" className="hover:text-white">Create Blog</a></li>
            <li><a href="/readblogs" className="hover:text-white">My Blogs</a></li>
            <li><a href="/login" className="hover:text-white">Login</a></li>
            <li><a href="/signup" className="hover:text-white">Signup</a></li>
          </ul>
        </div>

        {/* 3️⃣ Contact Info - Right */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2 text-blue-300 text-sm">
            <li className="flex justify-center md:justify-start items-center gap-2">
              <MapPin size={16} /> Pune, Maharashtra, India
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2">
              <Phone size={16} /> +91-9876543210
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2">
              <Mail size={16} /> contact@techblogs.com
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-blue-800 mt-8 py-4 text-center text-sm text-blue-300">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-medium">TechBlogs</span> — All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
