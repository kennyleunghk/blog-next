import React, { FC, useState } from 'react';
import { STATIC_FOLDER } from '../../config';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/styles';

interface ImagePreviewProps {
  path: string;
  avatar?: boolean;
  size?: string;
  onClosed?: () => void;
}

const Input = styled('input')({
  display: 'none',
});

const ImagePreview: FC<ImagePreviewProps> = ({
  path,
  avatar,
  size,
  onClosed,
}) => {
  const [storedImage, setStoredImage] = useState({});

  const imageSize = () => {
    if (!size) {
      return '200px';
    } else {
      switch (size.toLowerCase()) {
        case 'sm': {
          return '100px';
        }
        case 'md': {
          return '200px';
        }
        case 'lg': {
          return '400px';
        }
      }
    }
  };

  const boxProps = {
    display: avatar && 'flex',
    alignItems: avatar && 'end',
    textAlign: !avatar && 'center',
    justifyContent: avatar && 'center',
  };

  return (
    <Box
      component='div'
      sx={{
        display: avatar && 'flex',
        alignItems: avatar && 'end',
        justifyContent: avatar && 'center',
        textAlign: 'center',
      }}
    >
      <img
        height={imageSize()}
        src={STATIC_FOLDER + path}
        alt={avatar ? 'prifile-picture' : 'image-preview'}
        style={{
          minHeight: '100px',
          minWidth: '100px',
          borderRadius: avatar && '50%',
        }}
      />
      {onClosed && (
        <IconButton
          color='warning'
          sx={{ position: 'absolute', transform: 'translateX(-100%)' }}
          onClick={onClosed && onClosed}
        >
          <CancelIcon />
        </IconButton>
      )}
      {avatar && (
        <label htmlFor='contained-button-file'>
          <Input
            accept='image/*'
            id='contained-button-file'
            multiple
            type='file'
            onChange={(e) => setStoredImage(e.target.files[0])}
          />
          <Button
            variant='contained'
            component='span'
            size='small'
            sx={{ transform: 'translate(-100%, -100%)', position: 'absolute' }}
            startIcon={<PhotoCamera fontSize='small' />}
          >
            <b>Upload</b>
          </Button>
        </label>
      )}
    </Box>
  );
};

export default ImagePreview;
