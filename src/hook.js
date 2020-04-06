import React, {useCallback, useEffect, useRef, useContext, useState} from "react";
import api from './helpers/http';
import router from "./contants/router";
import {useLocation} from "react-router-dom";
import {formatTime} from "./helpers/datetime";
import {getAllTags, modifyPost, selectPost} from "./redux/postSlice";
import {useDispatch, useSelector} from "react-redux";
import EditorContext from "./redux/editorState";
import {addErrorMessage} from "./redux/globalSlice";
import {initState} from './redux/postSlice';
import BraftEditor from "braft-editor";

const useAuth = () => {
  const from = useRef(router.ADMIN);
  const {state: routeState} = useLocation();
  const [state, setState] = React.useState({
    loading: true,
    auth: false,
  });

  const auth = React.useMemo(() => ({
    success() {
      setState({
        loading: false,
        auth: true,
      });
    },
    failed() {
      setState({
        auth: false,
        loading: false,
      });
    }
  }), []);


  const authLogin = useCallback(() => {
    api.auth().then(res => {
      if (res.status === 'success') {
        auth.success();
      } else {
        auth.failed();
      }
    });
  }, [auth]);

  useEffect(() => {
    if (routeState) {
      from.current = routeState.from;
      if (routeState.from.pathname.match(/^\/admin/)) {
        auth.failed();
      }
    }
  }, [auth, routeState]);


  useEffect(() => {
    if (state.loading) {
      if (!localStorage.getItem('identify') || !localStorage.getItem('Authorization')) {
        auth.failed();
      } else {
        authLogin();
      }
    }
  }, [auth, authLogin, state.loading]);

  return [state, from.current];
};

// 定时刷新token
const useRefreshToken = () => {
  // TODO 具体时间写入配置
  const timing = useRef(-1);
  useEffect(() => {
    timing.current = setInterval(() => {
      api.auth().then(res => {
        //TODO
      });
    }, 30 * 1000);
    return clearInterval(timing.current);
  }, []);
};

// 用于文章表单提交
// 由于有多组件需要同时使用,且必须层层传递,表单字段改变会导致该函数改变,引起接受该函数的组件重新渲染
// 所以提取成hooks
const useSubmitPost = (postId) => {
  const {form} = useSelector(selectPost);
  const {state: {article, excerpt}} = useContext(EditorContext);
  const dispatch = useDispatch();
  const convert = (data, field) => {
    try {
      data[field] = data[field].toRAW();
    } catch (e) {
    }
  };

  return useCallback(() => {
    const data = {...form, article, excerpt};
    convert(data, 'article');
    convert(data, 'excerpt');
    data.create_date = formatTime(data.create_date);
    dispatch(modifyPost(data, postId));
  }, [article, dispatch, excerpt, form, postId]);
};

export const useGetPost = (postId) => {
  const [loading, setLoading] = useState(true);
  const {dispatch: dispatchEditorState, action} = useContext(EditorContext);
  const dispatch = useDispatch();
  const getPost = React.useCallback(() => api.getPost(null, postId).then(res => {
    if (res.status === 'success') {
      const {data: {article, excerpt, ...values}} = res;
      dispatch(initState(values));
      dispatchEditorState(action.article(BraftEditor.createEditorState(article)));
      dispatchEditorState(action.excerpt(BraftEditor.createEditorState(excerpt)));
      setLoading(false);
    } else {
      dispatch(addErrorMessage('请求错误'));
    }
  }), [action, dispatch, dispatchEditorState, postId]);
  useEffect(() => {
    getPost();
  }, [getPost]);
  return loading;
};

export const useGetAllTags = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // 获取所有标签,用于自动补全
    dispatch(getAllTags());
  }, [dispatch]);
};

export {useAuth, useRefreshToken, useSubmitPost};
