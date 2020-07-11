// @flow

import React, {useCallback, useEffect, useRef, useState} from "react";
import router from "../contants/router.json";
import {useLocation} from "react-router-dom";
import commonApi from "../helpers/api/common";
import {refresh_token_space} from "../config/security";


export const useAuth = () => {
  const from = useRef(router.ADMIN);
  const {state: routeState} = useLocation();
  const [state, setState] = useState({
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
    commonApi.auth().then(res => {
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
  //BUG
  const timing = useRef(-1);
  useEffect(() => {
    timing.current = setInterval(() => {
      commonApi.auth();
    }, refresh_token_space);
    // return clearInterval(timing.current);
  }, []);
};
