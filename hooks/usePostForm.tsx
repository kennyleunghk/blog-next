import React, { useState, useEffect } from 'react';

const usePostForm = () => {
  const [postFormData, setPostFormData] = useState({
    Title: '',
    CoverImg: '',
    Description: '',
    Tags: '',
    Category: 0,
  });

  const [markdownData, setMarkdownData] = useState('');

  const [errorFlag, setErrorFlag] = useState({
    title: false,
    image: false,
    description: false,
    category: false,
    content: false,
  });

  const [focusFlag, setFocusFlag] = useState({
    title: false,
    image: false,
    description: false,
    category: false,
    content: false,
  });

  const [submittable, setSubmittable] = useState(false);

  const focusHandler = (e) => {
    switch (e.target.id) {
      case 'title': {
        setFocusFlag({ ...focusFlag, title: true });
        break;
      }
      case 'description': {
        setFocusFlag({ ...focusFlag, description: true });
        break;
      }
      case 'category': {
        setFocusFlag({ ...focusFlag, category: true });
        break;
      }
      default: {
        setFocusFlag({ ...focusFlag, category: true });
        break;
      }
    }
  };

  const formUpdateHandler = (e) => {
    if (e.type === 'click') {
      setPostFormData({
        ...postFormData,
        Category: e.target.value,
      });
    } else {
      switch (e.target.id) {
        case 'title': {
          setPostFormData({
            ...postFormData,
            Title: e.target.value,
          });
          break;
        }
        case 'description': {
          setPostFormData({
            ...postFormData,
            Description: e.target.value,
          });
          break;
        }
        case 'tags': {
          setPostFormData({
            ...postFormData,
            Tags: e.target.value,
          });
          break;
        }
        default:
          setPostFormData({
            ...postFormData,
          });
      }
    }
  };

  const formValidator = async (formType) => {
    switch (formType) {
      case 'new': {
        break;
      }
      case 'edit': {
        console.log('in edit');
        if (postFormData.Title.trim().length === 0) {
          console.log('title error');
          setErrorFlag({ ...errorFlag, title: true });
          break;
        }
        if (postFormData.Category === 0) {
          console.log('cate error');
          setErrorFlag({ ...errorFlag, category: true });
          break;
        }
        if (postFormData.CoverImg.length === 0) {
          console.log('img error');
          setErrorFlag({ ...errorFlag, image: true });
          break;
        }
        if (postFormData.Description.trim().length === 0) {
          console.log('desc error');
          setErrorFlag({ ...errorFlag, description: true });
          break;
        }
        console.log('set true');
        setSubmittable(true);
        break;
      }
      default:
        console.log('Form Type error');
        break;
    }
  };

  return [
    postFormData,
    markdownData,
    errorFlag,
    focusFlag,
    setPostFormData,
    setMarkdownData,
    formUpdateHandler,
    focusHandler,
    formValidator,
    submittable,
  ] as const;
};

export default usePostForm;
