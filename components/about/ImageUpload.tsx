import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rootState } from '../../store';
import aboutActions from '../../store/slices/about-slice';
import { messageActions } from '../../store/slices/message-slice';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import classes from '../../styles/about/ProfileImage.module.css';
import PanoramaIcon from '@mui/icons-material/Panorama';
import FileUploadIcon from '@mui/icons-material/FileUpload';

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
          <span style={{ display: 'flex' }}>
            <FileUploadIcon fontSize='small' />
            <Typography fontWeight='bold' fontSize='small'>
              Change
            </Typography>
          </span>
        </label>
      </div>
    </>
  );
};

export default ImageUpload;
