import User from './User';
import React, {useEffect, useState} from "react";
import api from "../../helpers/http";
import {createEditorState} from "../../components/Editor";
import Loading from "../../components/Loading";
import {object, string} from "yup";


export default () => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    username: '',
    nickname: '',
    about: createEditorState(null),
    avatar: ''
  });

  useEffect(() => {
    api.getUserInfo().then(res => {
      const data = res.data;
      data.about = createEditorState(data.about);
      setState({...data, password: ''});
      setLoading(false);
    });
  }, []);

  const validationSchema = object({
    username: string()
      .max(128, '用户名不能超过128位')
      .required('请输入用户名'),
    nickname: string()
      .max(128, '昵称不能超过128位')
      .required('请输入昵称'),
  });
  return loading
    ? <Loading/>
    : <User {...{state, setState, validationSchema}}/>;
};
