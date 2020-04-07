import Security from './Security';
import React, {useEffect, useState} from "react";
import {Loading} from "../../components";
import {useDispatch} from "react-redux";
import {getUserEmail} from "../../redux/userSlice";

export default () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserEmail(setLoading));
  }, [dispatch]);
  return loading ? <Loading/> : <Security/>;
};
