import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/useHttp';
import { messageActions } from '../../store/slices/message-slice';
import dynamic from 'next/dynamic';
import { Box, Button } from '@mui/material';
import { aboutActions } from '../../store/slices/about-slice';
import SendIcon from '@mui/icons-material/Send';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { BACKEND } from '../../config';
interface props {
  tempMarkdownData: string;
  setAbout: (e) => void;
}

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

const AboutMdEditor: FC<props> = ({ tempMarkdownData, setAbout }) => {
  const dispatch = useDispatch();

  const sendToServer = async () => {
    const token = localStorage.getItem('token');
    const option = {
      headers: { Authorization: 'Bearer ' + token },
      body: { Describes: tempMarkdownData },
    };
    try {
      const result = await useHttp('patch', `${BACKEND}/About/update`, option);
      if (result.statusText === 'OK') {
        console.log(result.data);
        dispatch(messageActions.setSuccess(result.data.msg));
      }
    } catch (error) {
      console.log(error);
      if (error.message.includes('401')) {
        await messageActions.setError('You are not logged in');
      } else {
        await messageActions.setError(
          'Server error! Please contact System Administrator'
        );
      }
    }
  };

  const MDProps: any = {
    value: tempMarkdownData,
    onChange: (e) => setAbout(e),
  };

  return (
    <Box sx={{ marginBottom: 0.5 }}>
      <Box>
        <MDEditor {...MDProps} height='385' visiableDragbar={false} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          marginTop: 2,
        }}
      >
        <Button
          variant='contained'
          color='success'
          startIcon={<SendIcon />}
          onClick={sendToServer}
          sx={{ fontWeight: 'bold' }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default AboutMdEditor;
