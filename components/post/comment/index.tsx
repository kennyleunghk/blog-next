import { Box } from '@mui/system';
import React, { FC } from 'react';
import CommentList from './CommentList';
import NewComment from './NewComment';

const Comment = ({ comments }) => {
  return (
    <Box
      sx={{
        bgcolor: '#F5F5F5',
        borderRadius: '5px',
        padding: '0.5rem 0.5rem',
        marginTop: '2rem',
      }}
    >
      <NewComment />
      <CommentList comments={comments} />
    </Box>
  );
};

export default Comment;
