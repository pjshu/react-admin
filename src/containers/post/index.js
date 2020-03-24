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
    try {
      data.excerpt = data.excerpt.toRAW();
    } catch (e) {}
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
    : <Post {...{postId, onSubmit, handleOnSave}}/>;
}

export default PostWrapper;
