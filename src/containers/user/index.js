import User from './User';
import React, {useEffect, useState} from "react";
import {Loading} from "../../components";
import {useGetUserInfoApi} from "../../redux/userSlice";

export default () => {
  const [loading, setLoading] = useState(true);
  const getUserInfo = useGetUserInfoApi();
  useEffect(() => {
    getUserInfo(setLoading);
  }, [getUserInfo]);

  return loading ? <Loading/> : <User/>;
};
