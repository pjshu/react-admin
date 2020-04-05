import Login from './Login';
import React from 'react';
import Loading from "../../components/Loading";
import {Redirect} from 'react-router-dom';
import {useAuth} from "../../hook";

const Index = React.memo(function Index(){
  const [state, from] = useAuth();
  return (
    <>
      {
        state.loading ? <Loading/> :
          state.auth ? <Redirect to={from}/> : <Login/>
      }
    </>
  );
});

export default Index;
