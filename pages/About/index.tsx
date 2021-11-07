import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../store';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import AboutMdEditor from '../../components/about/AboutMdEditor';
import { BACKEND } from '../../config';
import { useHttp } from '../../hooks/useHttp';
import { aboutActions } from '../../store/slices/about-slice';
import ImagePreview from '../../components/images/ImagePreview';
import { MDEditorProps } from '@uiw/react-md-editor';
import Profile from '../../components/about/Profile';
import { Box } from '@mui/system';

const Markdown: any = dynamic(
  (): any => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { ssr: false }
);
const index = () => {
  const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);
  const [about, setAbout] = useState<AboutModel>({
    Picture: '',
    Describes: '',
    tempMarkdownData: '',
  });

  useEffect(() => {
    getAboutData();
  }, []);

  const getAboutData = async () => {
    const about: AboutModel = await useHttp(
      'get',
      `${BACKEND}/LoadData/AboutMe`,
      null
    );
    if (about) {
      await setAbout({
        Picture: about.Picture,
        Describes: about.Describes,
        tempMarkdownData: about.Describes,
      });
    }
  };

  const mdDataHandler = (e) => {
    setAbout({
      ...about,
      tempMarkdownData: e,
    });
  };

  return (
    <Box component='div'>
      <Profile
        path={about.Picture}
        updatePicture={(p) => setAbout({ ...about, Picture: p })}
      />
      {isLoggedIn ? (
        <AboutMdEditor
          tempMarkdownData={about.tempMarkdownData}
          setAbout={mdDataHandler}
        />
      ) : (
        <Box sx={{ padding: '1rem 1rem' }}>
          <Markdown source={about.Describes} />
        </Box>
      )}
    </Box>
  );
};

export default index;
