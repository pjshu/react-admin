import React, {useEffect, useState} from "react";
import Post from './Post';
import BraftEditor from "../../config/editorConfig";
import {formatTime} from "../../helpers/datetime";
import api from "../../helpers/http";
import {useLocation} from "react-router-dom";
import Loading from "../../components/Loading";
import AlertMessage from "../../components/AlertMessage";

function PostWrapper() {
  const {pathname} = useLocation();
  const path = pathname.split('/');
  const postId = path[path.length - 1];
  const [loading, setLoading] = useState(true);
  const [postState, setPostState] = useState({
    id: -1,
    title: '',
    tags: [],
    visibility: '私密',
    excerpt: '',
    article: BraftEditor.createEditorState(null),
    allTags: [],
    comments: 0,
    create_date: formatTime(new Date()),
    change_date: formatTime(new Date())
  });
  const init = (state) => {
    setPostState(
      (postState) => ({...postState, ...state})
    );
  };

  const addAllTags = (allTags) => {
    setPostState(
      (postState) => ({...postState, allTags})
    );
  };

  useEffect(() => {
    api.getPost(null,postId).then(res => {
      console.log(res)
      if (res.status === 'success') {
        const {data} = res;
        init({...data, 'article': BraftEditor.createEditorState(data.article)});
        setLoading(false);
      } else {
        console.log(res);
        AlertMessage.error("请求错误");
      }
    });
  }, [postId]);

  useEffect(() => {
    // 获取所有标签,用于自动补全
    api.getAllTags().then(res => {
      addAllTags(res.data);
    });
  }, []);

  return loading
    ? <Loading/>
    : <Post {...{postState, postId}}/>;
}

export default PostWrapper;
