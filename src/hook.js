import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import api from './helpers/http';
import router from "./contants/router";
import {useLocation} from "react-router-dom";
import {formatTime} from "./helpers/datetime";
import {getAllTags, initState, modifyPost} from "./redux/postSlice";
import {useDispatch, useSelector} from "react-redux";
import EditorContext from "./redux/editorState";
import {addErrorMessage} from "./redux/globalSlice";
import {FORM, selects, clearFormErrors, changeFormErrors} from "./redux";
import {validations} from "./helpers/validate";
import {
  closeModal,
  login,
  modifyUserInfo,
  recoveryPassword,
  register,
  resetSendCodeTime,
  sendRecPassCode,
  resetPassword,
  resetEmail
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


const useSubmitPost = () => {
  const {state: {article, excerpt}} = useContext(EditorContext);
  const dispatch = useDispatch();

  return useCallback((form, postId) => {
    const data = {...form, article, excerpt};
    toRaw(data, 'article');
    toRaw(data, 'excerpt');
    data.create_date = formatTime(data.create_date);
    dispatch(modifyPost(data, postId));
  }, [article, dispatch, excerpt]);
};

const useSubmitLogin = () => {
  const dispatch = useDispatch();
  return useCallback((res) => {
    dispatch(login(res));
  }, [dispatch]);
};

const useSubmitRecPass = () => {
  const dispatch = useDispatch();
  return useCallback((values) => {
    dispatch(recoveryPassword(values));
  }, [dispatch]);
};

const useRecPassFormRendCode = () => {
  const dispatch = useDispatch();
  return useCallback((res) => {
    dispatch(resetSendCodeTime());
    dispatch(sendRecPassCode(res));
  }, [dispatch]);
};

const useSubmitRegister = () => {
  const dispatch = useDispatch();
  return useCallback((res) => {
    dispatch(closeModal());
    dispatch(register(res));
  }, [dispatch]);
};

const useSubmitUserInfo = () => {
  const dispatch = useDispatch();
  return useCallback(async (res) => {
    const data = {...res};
    if (data.about) {
      data.about = data.about.toRAW();
    }
    if (data.avatar) {
      data.avatar = await blog2Base64(data.avatar);
    }
    dispatch(modifyUserInfo(data));
  }, [dispatch]);
};

const useResetEmail = () => {
  const dispatch = useDispatch();
  return useCallback((res) => {
    dispatch(resetEmail(res));
  }, [dispatch]);
};

const useResetPassword = () => {
  const dispatch = useDispatch();
  return useCallback((res) => {
    dispatch(resetPassword(res));
  }, [dispatch]);
};

// 表单提交方法统一导出
const submitHooks = {
  [FORM.recoveryPassword]: useSubmitRecPass,
  [FORM.recoveryPasswordSendCode]: useRecPassFormRendCode,
  [FORM.login]: useSubmitLogin,
  [FORM.post]: useSubmitPost,
  [FORM.register]: useSubmitRegister,
  [FORM.userInfo]: useSubmitUserInfo,
  [FORM.resetEmail]: useResetEmail,
  [FORM.resetPassword]: useResetPassword
};

export const useSubmit = (formName, ...other) => {
  const schema = validations[formName];
  const useSubmit = submitHooks[formName];
  const clearFormError = clearFormErrors[formName];
  const changeFormError = changeFormErrors[formName];
  const {form} = useSelector(selects[formName]);
  const dispatch = useDispatch();
  const onSubmit = useSubmit();
  return useCallback(() => {
    schema.validate({
      ...form,
    }).then((res) => {
      onSubmit(res, ...other);
      dispatch(clearFormError());
    }).catch(({path: name, errors, ...other}) => {
      console.log(other);
      dispatch(changeFormError({name, value: errors[0]}));
    });
  }, [changeFormError, clearFormError, dispatch, form, onSubmit, other, schema]);
};
