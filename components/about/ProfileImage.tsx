import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../store';
import AboutMdEditor from './AboutMdEditor';
import ImageUpload from './ImageUpload';
import dynamic from 'next/dynamic';

import classes from '../../styles/about/ProfileImage.module.css';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const Markdown = dynamic(
  (): any => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { ssr: false }
);

const ProfileImage = () => {
  const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);

  const markdownData = useSelector(
    (state: rootState) => state.about.markdownData
  );
  const picture = useSelector((state: rootState) => state.about.picture);

  return (
    <div style={{ textAlign: 'center' }}>
      <div className={classes['profile-picture']}>
        <img
          src={`http://kennyleung-blog.sytes.net:9321/Static/Images/${picture}`}
          alt='Kenny Leung'
        />
        {isLoggedIn === true ? <ImageUpload /> : null}
      </div>

      {isLoggedIn ? (
        <AboutMdEditor markdownData={markdownData} />
      ) : (
        <Markdown source={markdownData} />
      )}
    </div>
  );
};

export default ProfileImage;
