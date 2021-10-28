import React, { FC } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { styled } from '@mui/styles';
import { Card, CardMedia, CardHeader, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';
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
      className={classes['post-title']}
      component='div'
      align='center'>
      {post.Title}
    </Typography>
  );

  return (
    <div className='col-sm-12 col-md-12 col-lg-6'>
      <Card className={classes['post-card']} sx={{ width: 600 }}>
        <CardHeader title={CardHeaderTitle} />
        <CardMedia
          component='img'
          height='200'
          width='600'
          image={`http://kennyleung-blog.sytes.net:9321/Static/Images/${post.CoverImg}`}
          alt={post.CoverImg}
          onClick={() => router.push('/')}
        />

        <Link href={`/Post/${post.Id}`}>
          <div className={classes['post-title']}></div>
        </Link>

        <CardContent>
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
    </div>
  );
};

export default PostCard;
