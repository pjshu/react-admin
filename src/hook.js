import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import api from './helpers/http';
import router from "./contants/router";
import {useLocation} from "react-router-dom";
import {formatTime} from "./helpers/datetime";
import {getAllTags, initState, modifyPost, selectPost} from "./redux/postSlice";
import {useDispatch, useSelector} from "react-redux";
import EditorContext from "./redux/editorState";
import {addErrorMessage} from "./redux/globalSlice";
import {validateEmail, validateLogin, validateRecoveryPassword} from "./helpers/validate";
import {
  changeFormError as _changeFormError,
  clearFormError as _clearFormError,
  closeModal,
  login,
  modifyUserInfo,
  recoveryPassword,
  register, resetEmail,
  resetSendCodeTime,
  selectLogin,
  selectRecoveryPassword,
  selectRegister, selectSecurity,
  selectUserInfo,
  sendRecPassCode
} from "./redux/userSlice";
import {blog2Base64, toEditorState, toRaw} from "./helpers/misc";

export const useAuth = () => {
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
export const useRefreshToken = () => {
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
export const useSubmitPost = (postId) => {
  const {form} = useSelector(selectPost);
  const {state: {article, excerpt}} = useContext(EditorContext);
  const dispatch = useDispatch();


  return useCallback(() => {
    const data = {...form, article, excerpt};
    toRaw(data, 'article');
    toRaw(data, 'excerpt');
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
      dispatchEditorState(action.article(toEditorState(article)));
      dispatchEditorState(action.excerpt(toEditorState(excerpt)));
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

export const useSubmitLogin = () => {
  const clearFormError = (props) => _clearFormError({...props, form: 'recoveryPassword'});
  const changeFormError = (props) => _changeFormError({...props, form: 'recoveryPassword'});
  const {form} = useSelector(selectLogin);
  const dispatch = useDispatch();
  return useCallback(() => {
    validateLogin.validate({
      ...form
    }).then((res) => {
      dispatch(login(res));
      dispatch(clearFormError());
    }).catch(({path: name, errors}) => {
      dispatch(changeFormError({name, value: errors[0]}));
    });
  }, [dispatch, form]);
};

export const useSubmitRecPass = () => {
  const clearFormError = (props) => _clearFormError({...props, form: 'recoveryPassword'});
  const changeFormError = (props) => _changeFormError({...props, form: 'recoveryPassword'});
  const {form} = useSelector(selectRecoveryPassword);
  const dispatch = useDispatch();
  return useCallback(() => {
    validateRecoveryPassword.validate({
      ...form
    }).then((values) => {
      dispatch(clearFormError());
      dispatch(recoveryPassword(values));
    }).catch(({path, errors}) => {
      dispatch(changeFormError({name: path, value: errors[0]}));
    });
  }, [dispatch, form]);
};

export const useRecPassFormRendCode = () => {
  const clearFormError = (props) => _clearFormError({...props, form: 'recoveryPassword'});
  const changeFormError = (props) => _changeFormError({...props, form: 'recoveryPassword'});
  const {form} = useSelector(selectRecoveryPassword);
  const dispatch = useDispatch();
  return useCallback(() => {
    validateEmail.validate({
      email: form.email
    }).then((res) => {
      dispatch(clearFormError());
      dispatch(resetSendCodeTime());
      dispatch(sendRecPassCode(res));
    }).catch(({path, errors}) => {
      dispatch(changeFormError({name: path, value: errors[0]}));
    });
  }, [dispatch, form.email]);
};

export const useSubmitRegister = () => {
  const {form} = useSelector(selectRegister);
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(closeModal());
    dispatch(register(form));
  }, [dispatch, form]);
};

export const useSubmitUserInfo = () => {
  const dispatch = useDispatch();
  const {form} = useSelector(selectUserInfo);
  return useCallback(async () => {
    const data = {...form};
    if (data.about) {
      data.about = data.about.toRAW();
    }
    if (data.avatar) {
      data.avatar = await blog2Base64(data.avatar);
    }
    dispatch(modifyUserInfo(data));
  }, [dispatch, form]);
};

export const useSubmitSecurity = () => {
  const dispatch = useDispatch();
  const {form} = useSelector(selectSecurity);
  return useCallback(() => {
    dispatch(resetEmail(form));
  }, [dispatch, form]);
};

export const submitHooks = {
  'recoveryPassword': useSubmitRecPass,
  'recoveryPasswordRendCode': useRecPassFormRendCode,
  'login': useSubmitLogin,
  'post': useSubmitPost,
  'register': useSubmitRegister,
  'userInfo': useSubmitUserInfo,
  'security': useSubmitSecurity,
};
