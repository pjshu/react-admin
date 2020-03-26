import Login from './Login';
import React, {Profiler} from 'react';
import Loading from "../../components/Loading";
import {Redirect, useLocation} from 'react-router-dom';
import router from '../../contants/router';
import {useAuth} from "../../hook";

function Index() {
  const [state, auth] = useAuth();
  const {state: routeState} = useLocation();
  let from = router.ADMIN;
  if (routeState) {
    from = routeState.from;
    if (routeState.from.pathname.match(/^\/admin/)) {
      auth.failed();
    }
  }

  return state.loading ? <Loading/> :
    state.auth ? <Redirect to={from}/> :
      <Login/>;
}

function onRenderCallback(props) {
  console.log(props);
}

export default function LogonCom() {
  return (
    <Profiler id={'login'} onRender={onRenderCallback}>
      <Index/>
    </Profiler>
  );
}
