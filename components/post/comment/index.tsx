import { Box } from '@mui/system';
import React, { FC } from 'react';
import CommentList from './CommentList';
import NewComment from './NewComment';

const Comment: FC = () => {
  return (
    <Box
      sx={{
        bgcolor: '#F5F5F5',
        borderRadius: '5px',
        padding: '.5rem 1rem',
        marginTop: '2rem',
      }}
    >
      <NewComment />
      <CommentList />
    </Box>
  );
};

export default Comment;
