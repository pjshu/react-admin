import Login from './Login';
import React, {useEffect, useState} from 'react';
import Loading from "../../components/Loading";
import {authLogin} from "../../redux/userSlice";
import {useDispatch} from "react-redux";

function Index() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authLogin(setLoading));
  }, []);
  return loading ? <Loading/> : <Login/>;
}

export default Index;
