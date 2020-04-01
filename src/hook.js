import React, {useCallback, useEffect, useRef} from "react";
import api from './helpers/http';
import router from "./contants/router";
import {useLocation} from "react-router-dom";

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
  // TODO 具体时间写入配置
  const timing = useRef(-1);
  useEffect(() => {
    timing.current = setInterval(() => {
      api.auth().then(res => {
        //TODO
      });
    }, 30 * 1000);
    return clearInterval(timing.current);
  }, []);
};

export {useAuth, useRefreshToken};
