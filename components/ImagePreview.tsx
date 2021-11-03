import React, { FC } from 'react';
import { STATIC_FOLDER } from '../config';

interface ImagePreviewProps {
  path: string;
}

const ImagePreview: FC<ImagePreviewProps> = ({ path }) => {
  return <img src={STATIC_FOLDER + path} alt='preview' />;
};

export default ImagePreview;
