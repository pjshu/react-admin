import React, {useEffect, useState} from "react";
import Post from './Post';
import {formatTime} from "../../helpers/datetime";
import {useLocation} from "react-router-dom";
import Loading from "../../components/Loading";
import {number, object, array, string} from "yup";
import {useDispatch, useSelector} from "react-redux";
import {getPost, getAllTags, modifyPost, selectPost} from '../../redux/postSlice';

function PostWrapper() {
  const {pathname} = useLocation();
  const path = pathname.split('/');
  const postId = path[path.length - 1];
  const {loading} = useSelector(selectPost);
  const dispatch = useDispatch();
  const validationSchema = object({
    id: number()
      .min(0, 'id不能小于0')
      .required('id不能为空'),
    title: string()
      .ensure(),
    tags: array(),
    visibility: string()
      .matches(/(私密|公开')/),
    excerpt: string()
      .required('请输入摘录')
      .max(300, '摘录不超过300字'),
    article: string()
      .ensure(),
  });

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId]);

  useEffect(() => {
    // 获取所有标签,用于自动补全
    dispatch(getAllTags());
  }, []);

  const onSubmit = (values) => {
    const data = {...values};
    if (data.article) {
      data.article = data.article.toRAW();
    }
    data.create_date = formatTime(data.create_date);
    dispatch(modifyPost(data, postId));
  };

  function handleOnSave(e, value) {
    if (e.keyCode === 83 && e.ctrlKey) {
      onSubmit(value);
    }
  }

  return loading
    ? <Loading/>
    : <Post {...{onSubmit, validationSchema, handleOnSave}}/>;
}

export default PostWrapper;
