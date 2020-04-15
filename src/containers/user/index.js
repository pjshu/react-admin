import User from './User';
import React, {useEffect, useState} from "react";
import {Loading} from "../../components";
import {useGetUserInfo} from "../../redux/userSlice";

export default () => {
  const [loading, setLoading] = useState(true);
  const getUserInfo = useGetUserInfo();
  useEffect(() => {
    getUserInfo(setLoading);
  }, [getUserInfo]);

  return loading ? <Loading/> : <User/>;
};
