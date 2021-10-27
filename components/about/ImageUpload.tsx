import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rootState } from '../../store';
import aboutActions from '../../store/slices/about-slice';
import { messageActions } from '../../store/slices/message-slice';

import classes from '../../styles/about/ProfileImage.module.css';
import PanoramaIcon from '@mui/icons-material/Panorama';

const ImageUpload = () => {
  const about = useSelector((state: rootState) => state.about);
  const dispatch = useDispatch();
  const setPicture = (e) => {
    console.log(e.target.files);
  };
  return (
    <>
      <div className={classes['image-upload']}>
        <label>
          <input
            onChange={setPicture}
            style={{ display: 'none' }}
            type='file'
          />
          <span style={{ fontWeight: 'bold', fontSize: '12px' }}>
            <PanoramaIcon fontSize='small' /> Upload
          </span>
        </label>
      </div>
    </>
  );
};

export default ImageUpload;
