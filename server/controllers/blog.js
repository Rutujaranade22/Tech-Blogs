import Blog from "./../models/Blog.js";

// --------------------------- CREATE BLOG ---------------------------
const postBlogs = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const { user } = req;

    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create temporary slug before saving
    const newBlog = new Blog({
      title,
      category,
      content,
      author: user?.id || "anonymous",
      slug: `temp-slug-${Date.now()}-${Math.random().toString()}`,
    });

    const savedBlog = await newBlog.save();

    // Generate friendly slug based on title and _id
    savedBlog.slug = `${title.toLowerCase().replace(/ /g, "-")}-${
      savedBlog._id
    }`.replace(/[^\w-]+/g, "");

    await savedBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: savedBlog,  
    });
  } catch (error) {
    console.error("❌ Error creating blog:", error.message);
    res.status(500).json({
      success: false,
      message: "Error creating blog",
      error: error.message,
    });
  }
};

// --------------------------- GET ALL BLOGS ---------------------------
const getBlogs = async (req, res) => {
  try {
    const { author } = req.query;

    const conditions = [{ status: "published" }];

    if (author) {
      conditions.push({ author: author });
    }

    const blogs = await Blog.find({
      $or: conditions,
    })
      .populate("author", "_id name email")
      .sort({
        status: 1,
        updatedAt: -1,
      });

    res.status(200).json({
      success: true,
      data: blogs,
      message: "Blogs fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};

// --------------------------- GET BLOG BY SLUG ---------------------------
const getBlogForSlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug }).populate("author", "_id name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
      message: "Blog fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching blog",
      error: error.message,
    });
  }
};

// --------------------------- PUBLISH BLOG ---------------------------
const patchPublishBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const { user } = req;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.author.toString() !== user?.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to publish this blog",
      });
    }

    await Blog.findOneAndUpdate({ slug }, { status: "published" });

    res.status(200).json({
      success: true,
      message: "Blog published successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error publishing blog",
      error: error.message,
    });
  }
};

// --------------------------- UPDATE BLOG ---------------------------
const putBlogs = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, category, content } = req.body;
    const { user } = req;

    const existingBlog = await Blog.findOne({ slug });

    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (existingBlog.author.toString() !== user?.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog",
      });
    }

    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      { title, category, content },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating blog",
      error: error.message,
    });
  }
};

export { getBlogForSlug, getBlogs, patchPublishBlog, postBlogs, putBlogs };
