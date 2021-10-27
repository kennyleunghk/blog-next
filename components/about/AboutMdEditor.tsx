import React, { FC, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { rootState } from '../../store';
import { messageActions } from '../../store/slices/message-slice';
import '@uiw/react-md-editor/markdown-editor.css';
import dynamic from 'next/dynamic';
import Button from '@mui/material/Button';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false },
);

const AboutMdEditor: FC = () => {
  const markdown = useRef();
  const currentMarkdownData = useSelector(
    (state: rootState) => state.about.markdownData,
  );
  const [data, setData] = useState(() => currentMarkdownData);
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
    console.log(data);
  };

  const updateMarkdownData = (e) => {
    console.log(e.target);
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        {/* <MDEditor value={about.mdData} onBlur={setMdData} /> */}
        <MDEditor value={data} height='600' onChange={setData} />
        <hr></hr>
        <Button variant='contained' type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AboutMdEditor;
