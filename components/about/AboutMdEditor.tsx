import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/useHttp';
import { messageActions } from '../../store/slices/message-slice';
import dynamic from 'next/dynamic';
import { Box, Button } from '@mui/material';
import { aboutActions } from '../../store/slices/about-slice';
import SendIcon from '@mui/icons-material/Send';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
interface props {
  markdownData: string;
}

const MDEditor: any = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

const AboutMdEditor: FC<props> = ({ markdownData }) => {
  const dispatch = useDispatch();

  const sendToServer = async () => {
    const token = localStorage.getItem('token');
    const option = {
      headers: { Authorization: token },
      body: { Describes: markdownData },
    };
    try {
      const result = await useHttp('patch', '', option);
      if (result) {
        dispatch(messageActions.setSuccess(result.msg));
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

  const updateMarkdownData = (e: string) => {
    dispatch(aboutActions.setMarkdownData(e));
  };

  const MDProps = {
    value: markdownData,
    height: '600',
    onChange: updateMarkdownData,
  };

  return (
    <Box sx={{ marginBottom: 10 }}>
      <Box>
        <MDEditor {...MDProps} />
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
