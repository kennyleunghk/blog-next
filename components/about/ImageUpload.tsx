// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { rootState } from '../../store';
// import { useHttp, useImageUpload } from '../../hooks/useHttp';
// import { aboutActions } from '../../store/slices/about-slice';
// import { messageActions } from '../../store/slices/message-slice';

// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import classes from '../../styles/about/ProfileImage.module.css';
// import PanoramaIcon from '@mui/icons-material/Panorama';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
// import axios from 'axios';
// import { BACKEND } from '../../config';

// const ImageUpload = () => {
//   const about = useSelector((state: rootState) => state.about);
//   const [tempImage, setTempImage] = useState(undefined);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     console.log(tempImage);
//   }, [tempImage]);

//   const uploadHandler = async () => {
//     const image = await useImageUpload(tempImage);
//     if (image.success) {
//       console.log(image);
//       dispatch(messageActions.setSuccess(image.success));
//       dispatch(aboutActions.setPicture(image.image));
//     } else {
//       dispatch(messageActions.setError(image));
//     }
//     // const token: string = await localStorage.getItem('token');
//     // const option = {
//     //   headers: {
//     //     Authorization: token,
//     //     'Content-Type': 'multipart/form-data',
//     //   },
//     // };
//     // const tempForm = new FormData();
//     // tempForm.append('file', tempImage);
//     // console.log(await tempForm);
//     // try {
//     //   const result: AxiosResult = await axios.post(
//     //     `${BACKEND}/upload/image_upload`,
//     //     tempForm,
//     //     option
//     //   );

//     //   if (result.data.success) {
//     //     // update database
//     //   } else {
//     //     console.log(result);
//     //     await dispatch(messageActions.setError(result.data));
//     //   }
//     // } catch (error) {
//     //   await dispatch(messageActions.setError(error));
//     // }
//   };
//   return (
//     <>
//       <div className={classes['button-wrapper']}>
//         <div className={classes['image-upload']}>
//           <label className={classes['image-label']}>
//             <input
//               onChange={(e) => setTempImage(e.target.files[0])}
//               style={{ display: 'none' }}
//               type='file'
//             />
//             <span style={{ display: 'flex' }}>
//               <FileUploadIcon fontSize='small' />
//               <Typography fontWeight='bold' fontSize='small'>
//                 Change
//               </Typography>
//             </span>
//           </label>
//         </div>
//         {tempImage !== undefined && (
//           <button onClick={() => uploadHandler()}>upload</button>
//         )}
//       </div>
//     </>
//   );
// };

// export default ImageUpload;
