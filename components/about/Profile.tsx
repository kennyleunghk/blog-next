import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { ChangeEvent, FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp, useImageUpload } from '../../hooks/useHttp';
import { rootState } from '../../store';
import { messageActions } from '../../store/slices/message-slice';
import ImagePreview from '../images/ImagePreview';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { BACKEND } from '../../config';

interface AppProps {
  path: string;
  updatePicture: any;
}

const Profile: FC<AppProps> = ({ path, updatePicture }: AppProps) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);
  const [tempProfilePicture, setTempProfilePicture] = useState(undefined);

  const imageUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length > 0) {
      const result = await useImageUpload(e.target.files[0]);
      if (result.success) {
        setTempProfilePicture(result.image);

        // const sendToServer = useHttp('patch', {Picture: })
      } else {
        await dispatch(messageActions.setError(result.error));
      }
    }
  };

  const clearPicture = () => {
    setTempProfilePicture(undefined);
  };

  const ImagePreviewProps: any = {
    avatar: true,
    path: tempProfilePicture === undefined ? path : tempProfilePicture,
    onClosed: tempProfilePicture !== undefined && clearPicture,
  };

  const sendToServer = async () => {
    if (tempProfilePicture !== undefined) {
      const data = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: {
          Picture: tempProfilePicture,
        },
      };
      try {
        const updated = await useHttp(
          'patch',
          `${BACKEND}/About/update-profile-picture`,
          data
        );
        if (updated) {
          await updatePicture(tempProfilePicture);
          await clearPicture();
          await dispatch(
            messageActions.setSuccess(
              'Profile picture has been updated successful'
            )
          );
        }
      } catch (error) {
        dispatch(messageActions.setError(error.message));
      }
    } else {
      dispatch(messageActions.setError('Profile picture is null!'));
    }
  };

  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'end',
        marginBottom: '0.5rem',
      }}
    >
      <ImagePreview {...ImagePreviewProps} />
      <label htmlFor='contained-button-file'>
        <input
          id='contained-button-file'
          style={{ display: 'none' }}
          type='file'
          onChange={imageUploadHandler}
        />
        {isLoggedIn && tempProfilePicture === undefined ? (
          <Button
            variant='contained'
            component='span'
            color='secondary'
            size='small'
            sx={{ transform: 'translate(-100%, -100%)', position: 'absolute' }}
            startIcon={<PhotoCamera fontSize='small' />}
          >
            <b>Select</b>
          </Button>
        ) : null}
        {isLoggedIn && tempProfilePicture !== undefined && (
          <Button
            variant='contained'
            startIcon={<FileUploadIcon />}
            sx={{ transform: 'translate(-100%, -100%)', position: 'absolute' }}
            size='small'
            onClick={sendToServer}
          >
            <b>Upload</b>
          </Button>
        )}
      </label>
    </Box>
  );
};

export default Profile;
