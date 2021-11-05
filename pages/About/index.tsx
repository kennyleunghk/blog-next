import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileImage from '../../components/about/ProfileImage';
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

const Markdown: any = dynamic(
  (): any => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { ssr: false },
);
const index = () => {
  const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);
  const [about, setAbout] = useState<AboutModel>({
    Picture: '',
    Describes: '',
    tempMarkdownData: '',
  });

  useEffect(() => {
    const about: AboutModel = useHttp(
      'get',
      `${BACKEND}/LoadData/AboutMe`,
      null,
    );
    if (about) {
      setAbout({
        Picture: about.Picture,
        Describes: about.Describes,
      });
    }
  }, []);

  const updatePicture = (picture: string) => {
    setAbout({
      ...about,
      Picture: picture,
    });
  };

  const MDProps = {
    source: about.Describes,
  };
  return (
    <>
      <Profile path={about.Picture} updatePicture={updatePicture} />
      {isLoggedIn ? (
        <AboutMdEditor markdownData={about.Describes} />
      ) : (
        <Markdown {...MDProps} />
      )}
    </>
  );
};

export default index;
