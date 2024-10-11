import React from "react";

const BlogPreview = ({ blogData }) => {
  const { title, contentBlocks, imageUrl, videoUrl } = blogData;

  return (
    <div className="blog-preview-container">
      <h1 className="blog-title">{title}</h1>

      {/* Display blog blocks */}
      {contentBlocks.map((block, index) => {
        switch (block.type) {
          case "text":
            return (
              <div key={index} className="blog-text-block">
                <p>{block.content}</p>
              </div>
            );
          case "image":
            return (
              <div key={index} className="blog-image-block">
                <img src={block.content} alt="Blog content" />
              </div>
            );
          case "video":
            return (
              <div key={index} className="blog-video-block">
                <video controls>
                  <source src={block.content} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            );
          default:
            return null;
        }
      })}

      {/* Preview blog image */}
      {imageUrl && (
        <div className="blog-image-preview">
          <img src={imageUrl} alt="Blog" />
        </div>
      )}

      {/* Preview blog video */}
      {videoUrl && (
        <div className="blog-video-preview">
          <video controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default BlogPreview;
