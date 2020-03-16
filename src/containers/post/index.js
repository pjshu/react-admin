import React, {useEffect, useState} from "react";
import Post from './Post';
import {createEditorState} from "../../components/Editor";
import {formatTime} from "../../helpers/datetime";
import api from "../../helpers/http";
import {useLocation} from "react-router-dom";
import Loading from "../../components/Loading";
import AlertMessage from "../../components/AlertMessage";
import {number, object, array, string} from "yup";


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
    article: createEditorState(null),
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
    api.getPost(null, postId).then(res => {
      if (res.status === 'success') {
        const {data} = res;
        init({...data, 'article': createEditorState(data.article)});
        setLoading(false);
      } else {
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

  const onSubmit = (values) => {
    const data = {...values};
    data.article = data.article.toRAW();
    data.create_date = formatTime(data.create_date);
    api.modifyPost(data, postId).then(res => {
      res.status === 'success'
        ? AlertMessage.success("上传成功")
        : AlertMessage.failed("上传失败");
    });
  };

  function handleOnSave(e, value) {
    if (e.keyCode === 83 && e.ctrlKey) {
      onSubmit(value);
    }
  }

  const [open, setOpen] = React.useState(true);
  const setDrawerOpen = () => {
    setOpen(!open);
  };
  return loading
    ? <Loading/>
    : <Post {...{postState, postId, onSubmit, setDrawerOpen, open, validationSchema, handleOnSave}}/>;
}

export default PostWrapper;
