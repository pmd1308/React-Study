import React, { useState, useEffect, useMemo } from 'react';
import Post from './Post';

function Feed() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const renderedPosts = useMemo(() => (
        posts.map((post, index) => (
          <Post
            key={post.id + index} 
            id={post.id}
            userName={post.userId} 
            profilePicture={post.profilePicture} 
            content={post.body} 
          />
        ))
      ), [posts]);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="feed">
            <h2>My Social Media Feed</h2>
            {renderedPosts}
        </div>
    );
}

export default Feed;
