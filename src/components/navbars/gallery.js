import React, { useEffect, useState } from "react";

function Gallery() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      const accessToken = process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN;
      const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink,comments_count,like_count&access_token=${accessToken}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
      }
    };

    fetchInstagramPosts();
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      {/* Left Side: Gallery Grid */}
      <div style={{ flex: 2, display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post)}
            style={{
              cursor: "pointer",
              width: "200px",
              height: "200px",
              overflow: "hidden",
            }}
          >
            {post.media_type === "IMAGE" ? (
              <img
                src={post.media_url}
                alt={post.caption}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <video
                src={post.media_url}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                controls
              />
            )}
          </div>
        ))}
      </div>

      {/* Right Side: Selected Post Details */}
      <div style={{ flex: 1, padding: "20px", borderLeft: "1px solid #ccc" }}>
        {selectedPost ? (
          <div>
            {selectedPost.media_type === "IMAGE" ? (
              <img
                src={selectedPost.media_url}
                alt={selectedPost.caption}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            ) : (
              <video
                src={selectedPost.media_url}
                style={{ width: "100%", borderRadius: "8px" }}
                controls
              />
            )}
            <h3>Description</h3>
            <p>{selectedPost.caption || "No caption available"}</p>
            <div style={{ marginTop: "20px" }}>
              <p>Likes: {selectedPost.like_count}</p>
              <p>Comments: {selectedPost.comments_count}</p>
            </div>
            <a
              href={selectedPost.permalink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                color: "#007bff",
              }}
            >
              View on Instagram
            </a>
            {/* Follow on Instagram Button */}
            <a
              href="https://www.instagram.com/your_username/" // Apna Instagram username yahan dalen
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "10px 20px",
                backgroundColor: "#E1306C",
                color: "#fff",
                borderRadius: "5px",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Follow on Instagram
            </a>
          </div>
        ) : (
          <p>Select a post to view details</p>
        )}
      </div>
    </div>
  );
}

export default Gallery;
