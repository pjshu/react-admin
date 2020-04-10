import React, {useCallback, useEffect} from "react";
import Post from './Post';
import {useLocation} from "react-router-dom";
import {Loading} from "../../components/";
import {Paper} from "@material-ui/core";
import useStyles from './post.style';
import {useSubmit, useGetPost} from '../../hook';
import {FORM} from "../../redux/formSlice";
import {useDispatch} from "react-redux";
import {getAllTags} from "../../redux/postSlice";


function PostWrapper() {
  const classes = useStyles();
  const {pathname} = useLocation();
  const path = pathname.split('/');
  const postId = path[path.length - 1];
  const onSubmit = useSubmit(FORM.post, postId);
  const loading = useGetPost(postId);

  const dispatch = useDispatch();
  useEffect(() => {
    // 获取所有标签,用于自动补全
    dispatch(getAllTags());
  }, [dispatch]);

  const handleKeyDown = useCallback((e) => {
    if (e.keyCode === 83 && e.ctrlKey) {
      e.preventDefault();
      onSubmit();
    }
  }, [onSubmit]);

  // 由于Post 页面最顶层组件需要监听ctrl+s快捷键,用于保存文章
  // 需要调用onSubmit函数
  // 但onSubmit函数在表单字段改变时会改变
  // 传递onSubmit到子组件会引起重新渲染
  // 所以将 <Container> 提取到这个组件而不是Post组件
  return loading
    ? <Loading/>
    : (
      <Paper
        className={classes.root}
        onKeyDown={handleKeyDown}
      >
        <Post {...{postId}}/>
      </Paper>
    );
}

export default React.memo(PostWrapper);
