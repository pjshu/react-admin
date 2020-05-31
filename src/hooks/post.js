// @flow

import {useState, useContext, useCallback, useEffect, useRef} from 'react';
import {EditorContext} from "../redux/editorState";
import {useDispatch} from "react-redux";
import {changeFormField} from "../redux/formSlice";
import FORM from "../contants/form.json";
import {getAttr} from "../helpers/misc";
import {convertEditorState, toEditorState} from '../components/editor/helper';
import {EDITOR} from "../config/editor";
import {addErrorMessage} from "../redux/globalSlice";
import {formatTime} from "../helpers/datetime";
import {modifyPost} from "../redux/postSlice";
import {useSubmit} from "./Submit";
import {validatePost} from "../helpers/validate";

export const useSubmitPost = (postId: number) => {
  const {state: {article, excerpt}} = useContext(EditorContext);
  const dispatch = useDispatch();

  return useCallback((form: Object) => {
    const data = {...form, article, excerpt};
    convertEditorState(data, 'article');
    convertEditorState(data, 'excerpt');
    data.create_date = formatTime(data.create_date);
    data.change_date = formatTime(new Date());
    dispatch(modifyPost(data, postId));
  }, [article, dispatch, excerpt, postId]);
};

export const useTiming = (autoSave: Object, postId: number) => {
  const onSubmit = useSubmitPost(postId);
  const handleOnSubmit = useSubmit(FORM.post, onSubmit, validatePost);
  const timerId = useRef();
  const [time, open] = getAttr(autoSave, ['time', 'open']);
  const timingUpload = useCallback(() => {
    return setInterval(() => {
      handleOnSubmit();
    }, time * 60 * 1000);
  }, [time, handleOnSubmit]);

  // 计时器
  useEffect(() => {
    if (open && time > 0) {
      timerId.current = timingUpload();
    }
    return () => clearInterval(timerId.current);
  }, [time, open, timingUpload]);
};


export const useGetPost = (postId: number) => {
  const [loading, setLoading] = useState(true);

  // 由于需要使用useContext,useGetPost不写成非hook形式,所以不放在postSlice.js内
  const {dispatch: dispatchEditorState, action} = useContext(EditorContext);
  const dispatch = useDispatch();

  const getPost = useCallback(async () => {
    const {getPost} = await import("../helpers/api/security");
    return getPost(null, postId).then(res => {
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
