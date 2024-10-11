import React, { useState } from "react";
import axios from "axios";
import { createReactEditorJS } from "react-editor-js";
import BlogPreview from "./BlogPreview";

const EditorJs = createReactEditorJS();

const BlogEditor = () => {
  const [editorData, setEditorData] = useState(null);
  const [title, setTitle] = useState("");
  const [previewMode, setPreviewMode] = useState(false); // State to toggle preview mode
  const [previewData, setPreviewData] = useState(null); // Store data for preview

  const handleSave = async () => {
    try {
      const blogData = {
        title,
        content: editorData,
        token: sessionStorage.getItem("authToken"),
      };
      await axios.post("/api/blogs", blogData);
      alert("Blog created successfully!");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const handlePreview = () => {
    // Prepare the blog data for preview
    const blogData = {
      title,
      contentBlocks: editorData.blocks,
      imageUrl: null, // You can add logic to fetch/upload images here
      videoUrl: null, // You can add logic to fetch/upload videos here
    };
    setPreviewData(blogData);
    setPreviewMode(true); // Switch to preview mode
  };

  return (
    <div className="container">
      <h2>Create Blog</h2>

      {!previewMode ? (
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Editor for creating the blog */}
          <EditorJs
            onChange={(api) => setEditorData(api.saver.save())} // Update editor data on change
            tools={{ header: require("@editorjs/header").default }}
          />

          <button onClick={handlePreview}>Preview Blog</button>
          <button onClick={handleSave}>Save Blog</button>
        </div>
      ) : (
        <div>
          {/* Blog preview component */}
          <BlogPreview blogData={previewData} />

          {/* Button to go back to edit mode */}
          <button onClick={() => setPreviewMode(false)}>Edit Blog</button>
          <button onClick={handleSave}>Save Blog</button>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
