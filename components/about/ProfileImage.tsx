import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../store';
import AboutMdEditor from './AboutMdEditor';
import ImageUpload from './ImageUpload';
import dynamic from 'next/dynamic';
import ImagePreview from '../ImagePreview';

import classes from '../../styles/about/ProfileImage.module.css';

const ProfileImage = () => {
  const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);

  const picture = useSelector((state: rootState) => state.about.picture);

  return (
    <div className={classes['profile-wrapper']}>
      <div className={classes['profile-picture']}>
        <ImagePreview path={picture} />
        {isLoggedIn === true ? <ImageUpload /> : null}
      </div>
    </div>
  );
};

export default ProfileImage;
