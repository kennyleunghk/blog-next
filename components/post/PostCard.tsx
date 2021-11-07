import React, { FC } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { styled } from '@mui/styles';
import { Card, CardMedia, CardHeader, CardContent } from '@mui/material';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import Link from 'next/link';

import classes from '../../styles/post/Posts.module.css';
import { PostModel } from '../../models/PostModel';

interface AppProps {
  post: PostModel;
}

interface CardHeaderTitleProps {
  title: string;
}

export const PostCard: FC<AppProps> = ({ post }) => {
  const router = useRouter();

  const CardHeaderTitle = (
    <Typography
      variant='h6'
      fontStyle={{
        fontWeight: 'bold',
        fontSize: '0.9rem',
        fontStyle: 'italic',
      }}
      component='div'
      align='center'
    >
      {post.Title}
    </Typography>
  );

  const routeHandler = (path: string) => {
    router.push(path);
  };

  return (
    <Grid item margin='1rem'>
      <Card sx={{ width: 500 }}>
        <CardHeader title={CardHeaderTitle} className={classes['post-title']} />
        <CardMedia
          component='img'
          className={classes['post-image']}
          image={`http://kennyleung-blog.sytes.net:9321/Static/Images/${post.CoverImg}`}
          alt={post.CoverImg}
          onClick={() => routeHandler(`Post/${post.Id}`)}
        />

        <CardContent>
          <Box>
            <Typography
              minHeight='3rem'
              sx={{
                fontStyle: 'italic',
                fontSize: '0.8rem',
              }}
            >
              {post.Description}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: 'repeat(2, 1fr)',
              marginTop: '1rem',
            }}
          >
            <Typography variant='body2' align='left' fontSize='0.8rem'>
              Kenny Leung
            </Typography>
            <Typography variant='body2' align='right' fontSize='0.8rem'>
              {moment(post.CreatedTime).format('DD MMM, YYYY')}
            </Typography>
          </Box>
          {/* <Row style={{ height: '100%' }}>
            <Col md={5} xs={12} style={{ textAlign: 'center' }}>
              <Link href={`/Post/${post.Id}`}>
                <Image
                  className={classes['post-image']}
                  src={`http://kennyleung-blog.sytes.net:9321/Static/Images/${post.Image}`}
                />
              </Link>
            </Col>

            <Col md={7} xs={12} style={{ fontSize: '0.8rem' }}>
              <Row>
                <Col xs={12} md={12} className={classes['post-category']}>
                  <b>[{post.Category}]</b>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12} className={classes['post-descript']}>
                  {post.Description.length > 100
                    ? post.Description.substring(0, 155) + '...'
                    : post.Description}
                </Col>
              </Row>
              <Row className={classes['post-tag']}>
                <Col xs={12} md={12} className={classes['tag']}>
                  {post.Tags}
                </Col>
              </Row>

              <Row className={classes['post-footer']}>
                <Col md={6} xs={6}>
                  {moment(post.CreatedTime).format('DD MMM, YYYY')}
                </Col>

                <Col md={6} xs={6} className={classes['post-author']}>
                  Kenny Leung
                </Col>
              </Row>
            </Col>
          </Row> */}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PostCard;
