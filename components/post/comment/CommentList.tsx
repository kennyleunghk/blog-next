import { Grid, GridProps } from '@mui/material';
import React, { FC } from 'react';

const CommentList = ({ comments }) => {
  const rowProps: GridProps = {
    item: true,
    xs: 12,
    md: 12,
    lg: 12,
    whiteSpace: 'pre-line',
    bgcolor: 'white',
    padding: '0.5 rem 0.5rem',
    marginTop: '1rem',
  };
  return (
    <Grid container spacing={0}>
      {comments.map((c) => (
        <Grid {...rowProps}>{c.Comment}</Grid>
      ))}
    </Grid>
  );
};

export default CommentList;
