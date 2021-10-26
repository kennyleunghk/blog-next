import React, { FC } from 'react';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';

const AboutMdEditor: FC = () => {
  const sendToServer = async () => {
    const token = localStorage.getItem('token');

    const option = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .patch(URL + 'api/about/update', { Describes: about.mdData }, option)
      .then((res) => {
        setSuccess(res.data.msg);
      })
      .catch((err) => {
        if (err.message.includes('401')) {
          setError('You are not logged in');
        } else {
          setError('Server error! Please contact System Administrator');
        }
      });
  };
  return (
    <div>
      <form onSubmit={formSubmitter}>
        <MDEditor value={about.mdData} onBlur={setMdData} />
        <hr></hr>
        <button className='btn btn-primary' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AboutMdEditor;
