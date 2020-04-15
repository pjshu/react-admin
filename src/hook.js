import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import api from './helpers/http';
import router from "./contants/router";
import {useHistory, useLocation} from "react-router-dom";
import {formatTime} from "./helpers/datetime";
import {modifyPost} from "./redux/postSlice";
import {addTagImg, modifyTag} from "./redux/tagSlice";
import {useDispatch, useSelector} from "react-redux";
import EditorContext from "./redux/editorState";
import {addErrorMessage} from "./redux/globalSlice";
import {FORM, selectForm, clearFormError, changeFormField, changeFormError} from "./redux/formSlice";
import {validations} from "./helpers/validate";
import {
  closeModal,
  useLogin,
  modifyUserInfo,
  useRecoveryPassword,
  register,
  resetSendCodeTime,
  sendRecPassCode,
  resetPassword,
  resetEmail, useSendRecPassCode, useRegister, useModifyUserInfo
} from "./redux/userSlice";
import {blog2Base64, toEditorState, convertEditorState} from "./helpers/misc";
import {refresh_token_space} from "./config/security";
import {EDITOR} from "./config/editor";


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
  const timing = useRef(-1);
  useEffect(() => {
    timing.current = setInterval(() => {
      api.auth().then(res => {
        //TODO
      });
    }, refresh_token_space * 1000);
    return clearInterval(timing.current);
  }, []);
};


const useGetPost = (postId) => {
  const [loading, setLoading] = useState(true);

  // 由于需要使用useContext,useGetPost不写成非hook形式,所以不放在postSlice.js内
  const {dispatch: dispatchEditorState, action} = useContext(EditorContext);
  const dispatch = useDispatch();

  const getPost = React.useCallback(() => {
    return api.getPost(null, postId).then(res => {
      if (res.status === 'success') {
        const {data: {article, excerpt, ...values}} = res;
        dispatch(changeFormField({...values, form: FORM.post}));
        dispatchEditorState(action.article(toEditorState(article, EDITOR.article)));
        dispatchEditorState(action.excerpt(toEditorState(excerpt, EDITOR.excerpt)));
        setLoading(false);
      } else {
        dispatch(addErrorMessage('请求错误'));
      }
    });
  }, [action, dispatch, dispatchEditorState, postId]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return loading;
};


const useSubmitPost = () => {
  const {state: {article, excerpt}} = useContext(EditorContext);
  const dispatch = useDispatch();

  return useCallback((form, postId) => {
    const data = {...form, article, excerpt};
    convertEditorState(data, 'article');
    convertEditorState(data, 'excerpt');
    data.create_date = formatTime(data.create_date);
    dispatch(modifyPost(data, postId));
  }, [article, dispatch, excerpt]);
};

const useSubmitLogin = () => {
  const loginApi = useLogin();
  return useCallback((res) => {
    loginApi(res);
  }, [loginApi]);
};

const useSubmitRecPass = () => {
  const recPassApi = useRecoveryPassword();
  const {[FORM.recoveryPasswordSendCode]: {email}} = useSelector(selectForm);

  return useCallback((values) => {
    recPassApi({...values, email});
  }, [email, recPassApi]);
};

const useRecPassFormRendCode = () => {
  const sendRecPassCodeApi = useSendRecPassCode();
  const dispatch = useDispatch();
  return useCallback((res) => {
    dispatch(resetSendCodeTime());
    sendRecPassCodeApi(res);
  }, [dispatch, sendRecPassCodeApi]);
};

const useSubmitRegister = () => {
  const dispatch = useDispatch();
  const registerApi = useRegister();
  return useCallback((res) => {
    dispatch(closeModal());
    registerApi(res);
  }, [dispatch, registerApi]);
};

const useSubmitUserInfo = () => {
  const modifyUserInfo = useModifyUserInfo();
  return useCallback(async (res) => {
    const data = {...res};
    convertEditorState(data, 'about');
    if (data.avatar) {
      data.avatar = await blog2Base64(data.avatar);
    }
    modifyUserInfo(data);
  }, [modifyUserInfo]);
};

const useResetEmail = () => {
  const resetEmail = useResetEmail();
  return useCallback((res) => {
    resetEmail(res);
  }, [resetEmail]);
};

const useResetPassword = () => {
  const resetPassword = useResetPassword();
  return useCallback((res) => {
    resetPassword(res);
  }, [resetPassword]);
};

const useSubmitTagsForm = () => {
  const dispatch = useDispatch();
  return useCallback((value, {updateHandler, addMultiple}) => {
    dispatch(modifyTag(value, updateHandler));
    dispatch(addTagImg(value, updateHandler));
    addMultiple();
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
  [FORM.resetPassword]: useResetPassword,
  [FORM.tags]: useSubmitTagsForm
};

const useSubmit = (formName, ...other) => {
  const schema = validations[formName];
  const useSubmit = submitHooks[formName];
  const {[formName]: form} = useSelector(selectForm);
  const dispatch = useDispatch();
  const onSubmit = useSubmit();
  return useCallback(() => {
    schema.validate({
      ...form,
    }).then((res) => {
      onSubmit(res, ...other);
      dispatch(clearFormError());
    }).catch(({path = '', errors = ['']}) => {
      dispatch(changeFormError({
        name: path,
        value: errors[0]
      }));
    });
  }, [dispatch, form, onSubmit, other, schema]);
};


// 定时提交
const useTiming = (autoSave, postId) => {
  const onSubmit = useSubmit(FORM.post, postId);
  const timerId = React.useRef();
  const timingUpload = useCallback(() => {
    return setInterval(() => {
      onSubmit();
    }, autoSave.time * 1000 * 60);
  }, [autoSave.time, onSubmit]);

  // 计时器
  useEffect(() => {
    if (autoSave.open && autoSave.time > 0) {
      timerId.current = timingUpload();
    }
    return () => clearInterval(timerId.current);
  }, [autoSave.time, autoSave.open, timingUpload]);
};

//控制路由跳转
const useRouter = () => {
  const history = useHistory();
  return {
    toAdmin: () => {
      history.push(router.ADMIN);
    },
    toPost: (postId) => {
      history.push(`${router.ADMIN_POST}/${postId}`);
    },
    toLogin: () => {
      history.push(router.LOGIN);
    }
  };
};

export {
  //控制路由跳转
  useRouter,
  // 定时提交
  useTiming,
  //form组件提交
  useSubmit,
  useGetPost,
  // 定时刷新token
  useRefreshToken,
  useAuth
};
