// @flow

import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {EditorContext} from "../redux/editorState";
import {useDispatch} from "react-redux";
import {changeFormField} from "../redux/formSlice";
import FORM from "../contants/form.json";
import {blob2Base64, getAttr} from "../helpers/misc";
import {convertEditorState, toEditorState} from '../components/editor/helper';
import {EDITOR} from "../config/editor";
import {addErrorMessage} from "../redux/globalSlice";
import {formatTime} from "../helpers/datetime";
import {modifyPost} from "../redux/postSlice";
import {useSubmit} from "./Submit";
import {validatePost} from "../helpers/validate";


export const useSubmitPost = (postId: number) => {
  const {state: {article, excerpt: excerpt_rich_text}} = useContext(EditorContext);
  const dispatch = useDispatch();

  return useCallback(async (form: Object) => {
    const data = {...form, article, excerpt_rich_text};
    if (data.illustration) {
      data['illustration'] = await blob2Base64(data.illustration);
    }
    convertEditorState(data, 'article');
    convertEditorState(data, 'excerpt_rich_text');
    data.create_date = formatTime(data.create_date);
    data.change_date = formatTime(new Date());
    dispatch(modifyPost(data, postId));
  }, [article, dispatch, excerpt_rich_text, postId]);
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

  const {dispatch: dispatchEditorState, action} = useContext(EditorContext);
  const dispatch = useDispatch();

  const getPost = useCallback(async () => {
    const {getPost} = await import("../helpers/api/security");
    return getPost(null, postId).then(res => {
      if (res.status === 'success') {
        const {data: {article, excerpt_rich_text, ...values}} = res;
        dispatch(changeFormField({...values, form: FORM.post, illustration_changed: false}));
        dispatchEditorState(action.article(toEditorState(article, EDITOR.article)));
        dispatchEditorState(action.excerpt(toEditorState(excerpt_rich_text, EDITOR.excerpt)));
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
