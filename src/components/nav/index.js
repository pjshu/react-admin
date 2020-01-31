import React from 'react';
import {useAuth} from '../../hook';
import Nav from "./Nav";
import Loading from "../Loading";

function Root() {
  const auth = useAuth();
  return auth ? <Nav/> : <Loading/>;
}

export default Root;
