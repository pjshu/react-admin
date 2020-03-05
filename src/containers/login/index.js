import Login from './Login';
import Loading from "../../components/Loading";
import React, {useState, useEffect} from 'react';
import api from '../../helpers/http';
import {toAdmin} from "../../history";
import AlertMessage from "../../components/AlertMessage";

function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.auth().then(res => {
      if (res.status === 'success') {
        toAdmin();
        AlertMessage.success('您已经登录');
      } else {
        setIsLoading(false);
      }
    });
  }, []);
  return isLoading ?
    <Loading/> :
    <Login/>;
}

export default Index;
