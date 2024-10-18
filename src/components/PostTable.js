import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';

const PostTable = ({ posts, loading, error }) => {
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  if (!posts || posts.length === 0) {
    return <Typography>No posts found.</Typography>;
  }

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
            <TableCell><strong>Word Count</strong></TableCell>
            <TableCell><strong>Title Hash</strong></TableCell>
            <TableCell><strong>Created At</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.description}</TableCell>
              <TableCell>{post.wordCount || 'N/A'}</TableCell>
              <TableCell>{post.titleHash || 'N/A'}</TableCell>
              <TableCell>{new Date(post.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PostTable;