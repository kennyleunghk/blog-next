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

  const [postValidator, setPostValidator] = useState({
    focus: {
      title: false,
      description: false,
      category: false,
      content: false,
    },
    error: {
      title: false,
      description: false,
      category: false,
      content: false,
    },
    submittable: false,
  });

  const focusHandler = (e) => {
    switch (e.target.id) {
      case 'title':
        setPostValidator({
          ...postValidator,
          focus: {
            ...postValidator.focus,
            title: true,
          },
        });
        break;
      case 'description':
        setPostValidator({
          ...postValidator,
          focus: {
            ...postValidator.focus,
            description: true,
          },
        });
        break;
      case 'category':
        setPostValidator({
          ...postValidator,
          focus: {
            ...postValidator.focus,
            category: true,
          },
        });
        break;
      default:
        setPostValidator({
          ...postValidator,
          focus: {
            ...postValidator.focus,
            content: true,
          },
        });
    }
  };

  useEffect(() => {
    const focusFlag = postValidator.focus.title;
    // set Title field to invalid
    if (postFormData.Title === '' && focusFlag) {
      setPostValidator({
        ...postValidator,
        error: { ...postValidator.error, title: true },
      });
    }
    // set Title field to invalid
    if (postFormData.Title !== '') {
      console.log('postFormData.Title !== ""');
      setPostValidator({
        ...postValidator,
        error: { ...postValidator.error, title: false },
      });
    }
  }, [postValidator.focus.title, postFormData.Title]);

  // validate Description field
  useEffect(() => {
    const focusFlag = postValidator.focus.description;
    if (postFormData.Description === '' && focusFlag) {
      setPostValidator({
        ...postValidator,
        error: { ...postValidator.error, description: true },
      });
    }
    // set Title field to invalid
    if (postFormData.Description !== '') {
      setPostValidator({
        ...postValidator,
        error: { ...postValidator.error, description: false },
      });
    }
  }, [postValidator.focus.description, postFormData.Description]);

  // validate Category field
  useEffect(() => {
    const focusFlag = postValidator.focus.category;
    if (postFormData.Category == 0 && focusFlag) {
      console.log('is 0');
      setPostValidator({
        ...postValidator,
        error: { ...postValidator.error, category: true },
      });
    }
    // set Title field to invalid
    if (postFormData.Category !== 0) {
      console.log('is not 0');
      setPostValidator({
        ...postValidator,
        error: { ...postValidator.error, category: false },
      });
    }
  }, [postValidator.focus.category, postFormData.Category]);

  // validate Category field
  useEffect(() => {
    const focusFlag = postValidator.focus.content;
    if (markdownData === '' && focusFlag) {
      setPostValidator({
        ...postValidator,
        error: { ...postValidator.error, content: true },
      });
    }
    // set Title field to invalid
    if (markdownData !== '') {
      setPostValidator({
        ...postValidator,
        error: { ...postValidator.error, content: false },
      });
    }
  }, [postValidator.focus.content, markdownData]);

  useEffect(() => {
    const focus = postValidator.focus;
    const error = postValidator.error;
    if (
      focus.title === false ||
      focus.content === false ||
      focus.description === false ||
      focus.category === false
    ) {
      setPostValidator({ ...postValidator, submittable: false });
    } else if (
      error.category === true ||
      error.title === true ||
      error.content === true ||
      error.description === true
    ) {
      setPostValidator({ ...postValidator, submittable: false });
    } else {
      setPostValidator({ ...postValidator, submittable: true });
    }
  }, [postValidator.focus, postValidator.error]);
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
  return [
    postFormData,
    markdownData,
    postValidator,
    setPostFormData,
    setMarkdownData,
    formUpdateHandler,
    focusHandler,
  ] as const;
};

export default usePostForm;
