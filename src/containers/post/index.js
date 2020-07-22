import React, {useCallback, useEffect} from "react";
import Post from './Post';
import {useParams} from "react-router-dom";
import Loading from "../../components/Loading";
import {Paper} from "@material-ui/core";
import useStyles from './post.style';
import {useGetPost, useSubmitPost} from '../../hooks/post';
import FORM from "../../contants/form.json";
import {useDispatch} from "react-redux";
import reducer, {getAllTags} from "../../redux/postSlice";
import {useSubmit} from "../../hooks/Submit";
import {validatePost} from '../../helpers/validate';
import {injectReducer} from '../../redux/store';

function PostWrapper() {
  injectReducer('post', reducer);
  const classes = useStyles();
  const {pid: postId} = useParams();
  const dispatch = useDispatch();

  const onSubmit = useSubmitPost(postId);
  const handleOnSubmit = useSubmit(FORM.post, onSubmit, validatePost);
  const loading = useGetPost(postId);

  useEffect(() => {
    // 获取所有标签,用于自动补全
    dispatch(getAllTags());
  }, [dispatch]);

  const handleKeyDown = useCallback((e) => {
    if (e.keyCode === 83 && e.ctrlKey) {
      e.preventDefault();
      handleOnSubmit();
    }
  }, [handleOnSubmit]);

  // 由于Post 页面最顶层组件需要监听ctrl+s快捷键,用于保存文章
  // 需要调用handleOnSubmit函数
  // 但handleOnSubmit函数在表单字段改变时会改变
  // 传递handleOnSubmit到子组件会引起重新渲染
  // 所以将 <Container> 提取到这个组件而不是Post组件
  return loading ?
    <Loading/> : (
      <Paper
        className={classes.root}
        onKeyDown={handleKeyDown}
      >
        <Post {...{postId}}/>
      </Paper>
    );
}

export default React.memo(PostWrapper);
