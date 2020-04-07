import User from './User';
import React, {useEffect, useState} from "react";
import {Loading} from "../../components";
import {useDispatch} from "react-redux";
import {getUserInfo} from "../../redux/userSlice";

export default () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo(setLoading));
  }, [dispatch]);

  return loading ? <Loading/> : <User/>;
};
