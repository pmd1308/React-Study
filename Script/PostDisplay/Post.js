// This is a component file that displays a feed of posts fetched from an API, ensuring each post has a unique identifier. The component fetches posts from a JSONPlaceholder API, generates unique IDs for each post by combining the API-provided ID with the index of the post in the array, and renders them in a social media feed format. It optimizes performance by memoizing the post components and the mapping of posts, and it utilizes React hooks suuch as useState, useEffect, useCallback, and useMemp to manage state and side effects efficiently. The file provides a robust solution for displaying posts with unique IDs in a React application.

import React, { useState, useEffect, memo } from 'react';

// Memorized Post Component
const Post = memo(({ id, userName, profilePicture, content }) => {
  const [likes, setLikes] = useState(0);

  // Memoizing handleLike function to prevent unnecessary re-renders
  const handleLike = () => {
    setLikes(prevLikes => prevLikes + 1);
  };

  return (
    <div className="post">
      <div className="user-info">
        <img src={profilePicture} alt="Profile" />
        <p>{userName}</p>
      </div>
      <p className="post-content">{content}</p>
      <p className="likes">{likes} Likes</p>
      <button onClick={handleLike}>Like</button>
    </div>
  );
});

export default Post;