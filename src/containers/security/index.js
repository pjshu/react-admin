import Security from './Security';
import React, {useEffect, useState} from "react";
import api from "../../helpers/http";
import Loading from "../../components/Loading";

export default () => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    email: '',
    password: '',
    conform_password: ''
  });

  useEffect(() => {
    api.getUserInfo().then(res => {
      const data = res.data;
      setState({...state, email: data.email});
      setLoading(false);
    });
  }, []);

  return loading
    ? <Loading/>
    : <Security {...{state, setState}}/>;
};
