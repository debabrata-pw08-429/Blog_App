import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./BlogFeed.module.css";

// Static data for demonstration
const staticBlogs = [
  {
    _id: "1",
    title: "Exploring React: A Comprehensive Guide",
    content: "Learn how to build dynamic user interfaces using React.js.",
    location: "USA",
  },
  {
    _id: "2",
    title: "Understanding JavaScript Closures",
    content: "A deep dive into closures and how they work in JavaScript.",
    location: "UK",
  },
  {
    _id: "3",
    title: "CSS Grid vs Flexbox: Which One to Use?",
    content: "Comparing CSS Grid and Flexbox for responsive design.",
    location: "Canada",
  },
  {
    _id: "4",
    title: "Getting Started with Node.js",
    content:
      "An introduction to building server-side applications with Node.js.",
    location: "Australia",
  },
  {
    _id: "5",
    title: "Top 10 Tips for Effective Code Reviews",
    content:
      "Best practices for conducting thorough and constructive code reviews.",
    location: "Germany",
  },
];

const BlogFeed = () => {
  const [blogs, setBlogs] = useState([...staticBlogs]);

  // useEffect(() => {

  //   const fetchBlogs = async () => {
  //     try {
  //       const locationRes = await axios.get(
  //         `https://ipinfo.io/json?token=${process.env.REACT_APP_IPINFO_TOKEN}`
  //       );
  //       const location = locationRes.data.country;
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_SERVER_API}/api/blogs?location=${location}`
  //       );
  //       setBlogs(res.data);
  //     } catch (error) {
  //       console.error("Error fetching blogs:", error);
  //     }
  //   };
  //   fetchBlogs();
  // }, []);

  return (
    <div className={styles.blogFeedContainer}>
      <h1 className={styles.blogFeedTitle}>Blog Feed</h1>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id} className={styles.blogCard}>
            <div className={styles.blogCardBody}>
              <h5 className={styles.blogCardTitle}>{blog.title}</h5>
              <p className={styles.blogCardContent}>{blog.content}</p>
              <small className={styles.blogCardLocation}>
                Location: {blog.location}
              </small>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noBlogsMessage}>
          No blogs available for your location.
        </p>
      )}
    </div>
  );
};

export default BlogFeed;
