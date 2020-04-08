import React, {useCallback} from "react";
import Post from './Post';
import {useLocation} from "react-router-dom";
import {Loading} from "../../components/";
import {Container, Paper} from "@material-ui/core";
import useStyles from './post.style';
import {useSubmit, useGetPost, useGetAllTags} from '../../hook';
import {FORM} from "../../redux";


function PostWrapper() {
  const classes = useStyles();
  const {pathname} = useLocation();
  const path = pathname.split('/');
  const postId = path[path.length - 1];
  const onSubmit = useSubmit(FORM.post, postId);
  const loading = useGetPost(postId);
  useGetAllTags();

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
      <Container
        component={Paper}
        className={classes.root}
        maxWidth={false}
        onKeyDown={handleKeyDown}
      >
        <Post {...{postId}}/>
      </Container>
    );
}

export default React.memo(PostWrapper);
