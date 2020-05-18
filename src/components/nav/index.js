import React from 'react';
import Nav from "./Nav";
import Loading from "../Loading";
import {Redirect, useLocation} from 'react-router-dom';
import router from '../../contants/router';
import {useAuth} from "../../hook";

function Root() {
  const [state] = useAuth();
  const location = useLocation();
  return state.loading ? <Loading/> :
    state.auth ? <Nav/> : <Redirect to={{
      pathname: router.LOGIN,
      state: {from: location}
    }}/>;
}

export default React.memo(Root);
