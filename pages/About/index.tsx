import React from 'react';
import { useSelector } from 'react-redux';
import ProfileImage from '../../components/about/ProfileImage';
import { rootState } from '../../store';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import AboutMdEditor from '../../components/about/AboutMdEditor';

const Markdown = dynamic(
  (): any => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { ssr: false }
);
const index = () => {
  const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);
  const markdownData = useSelector(
    (state: rootState) => state.about.markdownData
  );
  return (
    <>
      <ProfileImage />
      {isLoggedIn ? (
        <AboutMdEditor markdownData={markdownData} />
      ) : (
        <Markdown source={markdownData} />
      )}
    </>
  );
};

export default index;
