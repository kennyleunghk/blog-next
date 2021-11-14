import { Card, CardContent, Grid, GridProps, Typography } from '@mui/material';
import React, { FC } from 'react';
import moment from 'moment';

const CommentList = ({ comments }) => {
  return (
    <Grid container spacing={0}>
      {comments.map((c) => (
        <Card
          key={c.Id}
          sx={{
            width: '100%',
            margin: '0.5rem 0rem',
            padding: '0.5rem 0.5rem',
          }}
        >
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Typography whiteSpace='pre-line'>{c.Comment}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  marginTop: '0.5rem',
                }}
              >
                <Typography
                  variant='body2'
                  sx={{ margin: '0 1rem', fontStyle: 'italic' }}
                >
                  <strong>{c.Name}</strong>
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ margin: '0 1rem', fontStyle: 'italic' }}
                >
                  Created Time:{' '}
                  {moment(c.CreatedTime.substring(0, 22)).format(
                    'HH:mm:ss | DD MMM, YYYY'
                  )}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
};

export default CommentList;
