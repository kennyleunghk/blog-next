import React, { FC } from 'react';
import { STATIC_FOLDER } from '../../config';
import { borderRadius, Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

interface ImagePreviewProps {
  path: string;
  avatar?: boolean;
  size?: string;
  onClosed?: () => void;
}

const ImagePreview: FC<ImagePreviewProps> = ({
  path,
  avatar,
  size,
  onClosed,
}) => {
  // const imageSize = () => {
  //   switch (size.toLowerCase()) {
  //     case 'sm': {
  //       return '100px';
  //     }
  //     case 'md': {
  //       return '200px';
  //     }
  //     case 'lg': {
  //       return '400px';
  //     }
  //     default: {
  //       return '200px';
  //     }
  //   }
  // };

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
    borderRadius: avatar && '50%',
  };

  return (
    <Box component='div' sx={{ ...boxProps, textAlign: 'center' }}>
      <img
        height={imageSize()}
        src={STATIC_FOLDER + path}
        alt={avatar ? 'prifile-picture' : 'image-preview'}
      />
      <IconButton
        color='warning'
        sx={{ position: 'absolute', transform: 'translateX(-100%)' }}
        onClick={onClosed}>
        <CancelIcon />
      </IconButton>
    </Box>
  );
};

export default ImagePreview;
