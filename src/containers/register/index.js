import Register from "./Register";
import React, {useEffect, useState} from 'react';
import {Loading} from "../../components";
import {checkRegister, useCheckRegister} from '../../redux/userSlice';
import {useDispatch} from "react-redux";


function Index() {
  const [loading, setLoading] = useState(true);
  const checkRegister = useCheckRegister();
  useEffect(() => {
    checkRegister(setLoading);
  }, [checkRegister]);

  return loading ?
    <Loading/> :
    <Register/>;
}

export default Index;
