// import React, { ChangeEvent, useEffect, useState, FC } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { rootState } from '../../store';
// import AboutMdEditor from './AboutMdEditor';
// import ImageUpload from './ImageUpload';
// import dynamic from 'next/dynamic';
// import ImagePreview from '../images/ImagePreview';

// import classes from '../../styles/about/ProfileImage.module.css';
// import { useImageUpload } from '../../hooks/useHttp';
// import { messageActions } from '../../store/slices/message-slice';

// const ProfileImage: FC<AboutModel | undefined> = ({ about }: AboutModel) => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);

//   const picture = useSelector((state: rootState) => state.about.picture);
//   const [tempProfilePicture, setTempProfilePicture] = useState({});

//   // const imageUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
//   //   const result = await useImageUpload(e.target.files[0]);
//   //   if (result.success) {
//   //     await dispatch(messageActions.setSuccess(result.success));
//   //     await setNewPostFormData({
//   //       ...newPostFormData,
//   //       Image: result.image,
//   //     });
//   //   } else {
//   //     await dispatch(messageActions.setError(result.error));
//   //     clearImage();
//   //   }
//   // };

//   return <ImagePreview path={picture} avatar />;
// };

// export default ProfileImage;
