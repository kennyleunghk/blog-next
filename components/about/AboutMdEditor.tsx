import React, { FC, Ref, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { rootState } from '../../store';
import { messageActions } from '../../store/slices/message-slice';
import dynamic from 'next/dynamic';
import Button from '@mui/material/Button';
import { aboutActions } from '../../store/slices/about-slice';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

interface props {
  markdownData: string;
}

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

const AboutMdEditor: FC<props> = ({ markdownData }) => {
  const markdown = useRef<HTMLElement | null>();
  // const markdownData = useSelector(
  //   (state: rootState) => state.about.markdownData
  // );
  const dispatch = useDispatch();

  // const sendToServer = async () => {
  //   const token = localStorage.getItem('token');

  //   const option = {
  //     headers: {
  //       Authorization: token,
  //     },
  //   };

  //   axios
  //     .patch(URL + 'api/about/update', { Describes: data }, option)
  //     .then((res) => {
  //       dispatch(messageActions.setSuccess(res.data.msg));
  //     })
  //     .catch((err) => {
  //       if (err.message.includes('401')) {
  //         setError('You are not logged in');
  //       } else {
  //         setError('Server error! Please contact System Administrator');
  //       }
  //     });
  // };
  const formSubmitHandler = (e) => {
    e.preventDefault();
  };

  const updateMarkdownData = (e) => {
    dispatch(aboutActions.setMarkdownData(e));
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <MDEditor
          value={markdownData}
          height='600'
          onChange={updateMarkdownData}
        />
        <hr></hr>
        <Button variant='contained' type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AboutMdEditor;
