import Login from './Login';
import React from 'react';
import {AsyncLoading} from "../../components/Loading";

function Index() {
  return <AsyncLoading render={(setIsLoading) => <Login setIsLoading={setIsLoading}/>}/>;
}

export default Index;
