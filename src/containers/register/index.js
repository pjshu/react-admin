import Register from "./Register";
import React, {useEffect, useState} from 'react';
import Loading from "../../components/Loading";
import reducer, {checkRegister} from '../../redux/userSlice';
import {useDispatch} from "react-redux";
import {injectReducer} from "../../redux/store";


function RegisterWrapper() {
  injectReducer('user', reducer);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkRegister(setLoading));
  }, [dispatch]);

  return loading ? <Loading/> : <Register/>;
}

export default React.memo(RegisterWrapper);
