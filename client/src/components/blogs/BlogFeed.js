import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogFeed = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch user location and blogs
    const fetchBlogs = async () => {
      try {
        const locationRes = await axios.get(
          "https://ipinfo.io/json?token=<your-token>"
        );
        const location = locationRes.data.country;
        const res = await axios.get(`/api/blogs?location=${location}`);
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <h1>Blog Feed</h1>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{blog.title}</h5>
              <p className="card-text">{blog.content}</p>
              <small>Location: {blog.location}</small>
            </div>
          </div>
        ))
      ) : (
        <p>No blogs available for your location.</p>
      )}
    </div>
  );
};

export default BlogFeed;
