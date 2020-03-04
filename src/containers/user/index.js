import User from './User';
import React, {useEffect, useState} from "react";
import api from "../../helpers/http";
import BraftEditor from "../../config/editorConfig";
import Loading from "../../components/Loading";

export default () => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    username: '',
    nickname: '',
    email: '',
    password: '',
    about: BraftEditor.createEditorState(null),
    avatar: ''
  });

  useEffect(() => {
    api.getUserInfo().then(res => {
      const data = res.data;
      data.about = BraftEditor.createEditorState(data.about);
      setState({...data, password: ''});
      setLoading(false);
    });
  }, []);

  return loading
    ? <Loading/>
    : <User {...{state, setState}}/>;
};
