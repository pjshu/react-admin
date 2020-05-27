import Login from './Login';
import React from 'react';
import {Loading} from "../../components";
import {Redirect} from 'react-router-dom';
import {useAuth} from "../../hook";

function LoginWrapper(){
  const [state, from] = useAuth();
  return (
    <>
      {
        state.loading ? <Loading/> :
          state.auth ? <Redirect to={from}/> : <Login/>
      }
    </>
  );
};

export default React.memo(LoginWrapper);
