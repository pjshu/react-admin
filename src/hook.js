import {useEffect, useState} from "react";
import api from './helpers/http';
import {toLogin} from './history';

const useAuth = () => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('identify') || !localStorage.getItem('Authorization')) {
      toLogin();
      return;
    }
    api.auth().then(res => {
      if (res.status === 'success') {
        setAuth(true);
      }
    });
  });
  return auth;
};

export {useAuth};
