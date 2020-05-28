// @flow

import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import api from './helpers/http';
import router from "./contants/router";
import {useLocation} from "react-router-dom";
import {formatTime} from "./helpers/datetime";
import {modifyPost} from "./redux/postSlice";
import {addTagImg, modifyTag} from "./redux/tagSlice";
import {useDispatch, useSelector} from "react-redux";
import EditorContext from "./redux/editorState";
import {addErrorMessage} from "./redux/globalSlice";
import {
  changeFormError,
  changeFormField,
  clearFormError, createFieldSelector,
  createFormSelector,
  FORM,
} from "./redux/formSlice";
import {validations} from "./helpers/validate";
import {
  closeModal,
  login,
  modifyUserInfo,
  recoveryPassword,
  register,
  resetEmail,
  resetPassword,
  resetSendCodeTime,
  sendRecPassCode
} from "./redux/userSlice";
import {blob2Base64, convertEditorState, getAttr, toEditorState} from "./helpers/misc";
import {refresh_token_space} from "./config/security";
import {EDITOR} from "./config/editor";


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
  const timing = useRef(-1);
  useEffect(() => {
    timing.current = setInterval(() => {
      api.auth().then(res => {
        //TODO
      });
    }, refresh_token_space);
    // return clearInterval(timing.current);
  }, []);
};


export const useGetPost = (postId: number) => {
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

  return useCallback((form: Object, postId: number) => {
    const data = {...form, article, excerpt};
    convertEditorState(data, 'article');
    convertEditorState(data, 'excerpt');
    data.create_date = formatTime(data.create_date);
    data.change_date = formatTime(new Date());
    dispatch(modifyPost(data, postId));
  }, [article, dispatch, excerpt]);
};

const useSubmitLogin = () => {
  const dispatch = useDispatch();
  return useCallback((res) => {
    dispatch(login(res));
  }, [dispatch]);
};

const useSubmitRecPass: Function = () => {
  const dispatch = useDispatch();
  const email = useSelector(createFieldSelector([FORM.recoveryPasswordSendCode, 'email']));
  return useCallback((values: Object) => {
    dispatch(recoveryPassword({...values, email}));
  }, [dispatch, email]);
};

const useRecPassFormRendCode: Function = () => {
  const dispatch = useDispatch();
  return useCallback((res) => {
    dispatch(resetSendCodeTime());
    dispatch(sendRecPassCode(res));
  }, [dispatch]);
};

const useSubmitRegister: Function = () => {
  const dispatch = useDispatch();
  return useCallback((res) => {
    dispatch(closeModal());
    dispatch(register(res));
  }, [dispatch]);
};

const useSubmitUserInfo: Function = () => {
  const dispatch = useDispatch();
  return useCallback(async (res) => {
    const data = {...res};
    convertEditorState(data, 'about');
    if (data.avatar) {
      data.avatar = await blob2Base64(data.avatar);
    }
    dispatch(modifyUserInfo(data));
  }, [dispatch]);
};

const useResetEmail: Function = () => {
  const dispatch = useDispatch();
  return useCallback((res) => {
    dispatch(resetEmail(res));
  }, [dispatch]);
};

const useResetPassword: Function = () => {
  const dispatch = useDispatch();
  return useCallback((res) => {
    dispatch(resetPassword(res));
  }, [dispatch]);
};

const useSubmitTagsForm: Function = () => {
  const dispatch = useDispatch();
  return useCallback((value: Object, {updateHandler, addMultiple}: Object<Function>) => {
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

export const useSubmit = (formName: string, ...other) => {
  const schema = validations[formName];
  const useSubmit = submitHooks[formName];
  const onSubmit = useSubmit();
  const form = useSelector(createFormSelector(formName));
  const dispatch = useDispatch();
  return useCallback(() => {
    schema.validate({
      ...form.toJS(),
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
export const useTiming = (autoSave: Object, postId: number) => {
  const onSubmit = useSubmit(FORM.post, postId);
  const timerId = React.useRef();
  const [time, open] = getAttr(autoSave, ['time', 'open']);
  const timingUpload = useCallback(() => {
    return setInterval(() => {
      onSubmit();
    }, time * 60 * 1000);
  }, [time, onSubmit]);

  // 计时器
  useEffect(() => {
    if (open && time > 0) {
      timerId.current = timingUpload();
    }
    return () => clearInterval(timerId.current);
  }, [time, open, timingUpload]);
};
