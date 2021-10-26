import React from 'react';
import { useSelector } from 'react-redux';
import MDEditor from '@uiw/react-md-editor';

import { rootState } from '../../store';
import AboutMdEditor from './AboutMdEditor';
import ImageUpload from './ImageUpload';

const ProfileImage = () => {
  const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);
  const about = useSelector((state: rootState) => state.about);
  return (
    <div>
      <div className='profile-pic'>
        <img src={`${URL}Static/Images/${about.picture}`} alt='Kenny Leung' />
        {isLoggedIn === true ? <ImageUpload /> : null}
      </div>

      {isLoggedIn ? (
        <AboutMdEditor />
      ) : (
        <MDEditor.Markdown source={about.mdData} />
      )}
    </div>
  );
};

export default ProfileImage;
