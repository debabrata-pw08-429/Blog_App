const Blog = require("../models/Blog");

// Create Blog
exports.createBlog = async (req, res) => {
  const { title, content, location } = req.body;
  const blog = new Blog({
    title,
    content,
    author: req.user.id,
    location,
  });
  try {
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: "Blog creation failed" });
  }
};

// Get Blogs by Location
exports.getBlogs = async (req, res) => {
  const { location } = req.query;
  try {
    const blogs = await Blog.find({ location }).populate("author");
    res.json(blogs);
  } catch (err) {
    res.status(400).json({ error: "Error fetching blogs" });
  }
};
