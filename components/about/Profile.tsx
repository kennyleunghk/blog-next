import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { ChangeEvent, FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp, useImageUpload } from '../../hooks/useHttp';
import { rootState } from '../../store';
import { messageActions } from '../../store/slices/message-slice';
import ImagePreview from '../images/ImagePreview';

interface AppProps {
  path: string;
  updatePicture: any;
}

const Profile: FC<AppProps> = ({ path, updatePicture }: AppProps) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);
  const [tempProfilePicture, setTempProfilePicture] = useState({});
  useEffect(() => {
    console.log(tempProfilePicture);
  }, [tempProfilePicture]);
  const imageUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const result = await useImageUpload(e.target.files[0]);
    if (result.success) {
      setTempProfilePicture(result.image);

      // const sendToServer = useHttp('patch', {Picture: })
    } else {
      await dispatch(messageActions.setError(result.error));
    }
  };
  const clearPicture = () => {
    setTempProfilePicture({});
  };

  const ImagePreviewProps: any = {
    avatar: true,
    path:
      Object.keys(tempProfilePicture).length === 0 ? path : tempProfilePicture,
    onClosed: Object.keys(tempProfilePicture).length > 0 && clearPicture,
  };

  return (
    <Box
      component='div'
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end' }}>
      <ImagePreview {...ImagePreviewProps} />
      <label htmlFor='contained-button-file'>
        <input
          id='contained-button-file'
          style={{ display: 'none' }}
          type='file'
          onChange={imageUploadHandler}
        />
        <Button
          variant='contained'
          component='span'
          size='small'
          sx={{ transform: 'translate(-100%, -100%)', position: 'absolute' }}
          startIcon={<PhotoCamera fontSize='small' />}>
          <b>Upload</b>
        </Button>
      </label>
    </Box>
  );
};

export default Profile;
