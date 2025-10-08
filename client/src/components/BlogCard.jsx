import { Link } from "react-router";

function BlogCard({ title, author, category, slug, viewCount, publishedAt }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-3">
        {category}
      </span>
      <p className="text-gray-500 text-sm mb-4">
        {author?.name} • {new Date(publishedAt).toLocaleDateString()}
      </p>
      <p className="text-gray-400 text-sm mb-4">👁️ {viewCount} views</p>
      <Link
        to={`/blog/${slug}`}
        className="text-blue-600 font-medium hover:underline"
      >
        Read More →
      </Link>
       <Link
          to={`/edit/${slug}`}
          className="text-orange-500 font-medium hover:underline"
        >
          ✏️ Edit
        </Link>
    </div>
  );
}

export default BlogCard;
