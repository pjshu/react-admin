import React, {useCallback, useEffect, useState} from "react";
import Post from './Post';
import {formatTime} from "../../helpers/datetime";
import {useLocation} from "react-router-dom";
import Loading from "../../components/Loading";
import {useDispatch} from "react-redux";
import {getAllTags, getPost, modifyPost} from '../../redux/postSlice';

function PostWrapper() {
  const {pathname} = useLocation();
  const path = pathname.split('/');
  const postId = path[path.length - 1];
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId, setLoading));
  }, [dispatch, postId]);

  useEffect(() => {
    // 获取所有标签,用于自动补全
    dispatch(getAllTags());
  }, [dispatch]);

  const convert = (data, field) => {
    try {
      data[field] = data[field].toRAW();
    } catch (e) {
    }
  };

  const onSubmit = useCallback((values) => {
    const data = {...values};
    convert(data, 'article');
    convert(data, 'excerpt');
    data.create_date = formatTime(data.create_date);
    dispatch(modifyPost(data, postId));
  }, [dispatch, postId]);

  const handleOnSave = useCallback((e, value) => {
    if (e.keyCode === 83 && e.ctrlKey) {
      onSubmit(value);
    }
  }, [onSubmit]);

  return loading
    ? <Loading/>
    : <Post {...{postId, onSubmit, handleOnSave}}/>;
}

export default PostWrapper;
