import Security from './Security';
import React from "react";
import {AsyncLoading} from "../../components/Loading";

export default () => {
  return <AsyncLoading render={(setLoading) => <Security setLoading={setLoading}/>}/>;
};
