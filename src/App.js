import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import PostTable from './components/PostTable';
import PostModal from './components/PostModal';
import { fetchPosts, createPost } from './services/api';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await fetchPosts();
      if (response.statusCode === 200 && Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      await createPost(postData);
      await loadPosts();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f0f4f8', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Assignment
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setIsModalOpen(true)}
          sx={{ mb: 3 }}
        >
          Add Post
        </Button>
        <PostTable posts={posts} loading={loading} error={error} />
        <PostModal 
          open={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreatePost}
        />
      </Container>
    </Box>
  );
}

export default App;