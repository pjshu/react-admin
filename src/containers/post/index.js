import React, {useEffect} from "react";
import Post from './Post';
import {formatTime} from "../../helpers/datetime";
import {useLocation} from "react-router-dom";
import Loading from "../../components/Loading";
import {useDispatch, useSelector} from "react-redux";
import {getAllTags, getPost, modifyPost, selectPost} from '../../redux/postSlice';

function PostWrapper() {
  const {pathname} = useLocation();
  const path = pathname.split('/');
  const postId = path[path.length - 1];
  const {loading} = useSelector(selectPost);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    // 获取所有标签,用于自动补全
    dispatch(getAllTags());
  }, [dispatch]);

  const onSubmit = React.useCallback((values) => {
    const data = {...values};
    if (data.article) {
      data.article = data.article.toRAW();
    }
    if (data.excerpt) {
      data.excerpt = data.excerpt.toRAW();
    }
    data.create_date = formatTime(data.create_date);
    dispatch(modifyPost(data, postId));
  }, [dispatch, postId]);

  const handleOnSave = React.useCallback((e, value) => {
    if (e.keyCode === 83 && e.ctrlKey) {
      onSubmit(value);
    }
  }, [onSubmit]);

  return loading
    ? <Loading/>
    : <Post {...{postId, onSubmit, handleOnSave}}/>;
}

export default PostWrapper;
