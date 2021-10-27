import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../store';
import AboutMdEditor from './AboutMdEditor';
import ImageUpload from './ImageUpload';
import classes from '../../styles/about/ProfileImage.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ProfileImage = () => {
  const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);
  const about = useSelector((state: rootState) => state.about);
  console.log(isLoggedIn);
  useEffect(() => {
    console.log(about);
  }, [about]);
  return (
    <div>
      <div className={classes['profile-picture']}>
        <img src={`${URL}Static/Images/${about.picture}`} alt='Kenny Leung' />
        {isLoggedIn === true ? <ImageUpload /> : null}
      </div>

      {isLoggedIn ? (
        <AboutMdEditor />
      ) : (
        <ReactMarkdown
          children={about.markdownData}
          remarkPlugins={[remarkGfm]}
        />
      )}
    </div>
  );
};

export default ProfileImage;
