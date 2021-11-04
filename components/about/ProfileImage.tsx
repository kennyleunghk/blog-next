import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../store';
import AboutMdEditor from './AboutMdEditor';
import ImageUpload from './ImageUpload';
import dynamic from 'next/dynamic';
import ImagePreview from '../images/ImagePreview';

import classes from '../../styles/about/ProfileImage.module.css';

const ProfileImage = () => {
  const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);

  const picture = useSelector((state: rootState) => state.about.picture);

  return (
    <ImagePreview
      path={
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHs59XIBm88TPStgRmtvQi56dH_mFdiPhjcQ&usqp=CAU'
      }
      avatar
    />
  );
};

export default ProfileImage;
