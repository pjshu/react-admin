import Security from './Security';
import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import {useDispatch} from "react-redux";
import {getUserInfo} from "../../redux/userSlice";

export default () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo(setLoading));
  }, [dispatch]);
  return loading ? <Loading/> : <Security/>;
};
