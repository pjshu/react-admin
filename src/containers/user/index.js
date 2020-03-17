import User from './User';
import React, {useEffect, useState} from "react";
import {object, string} from "yup";
import Loading from "../../components/Loading";
import {useDispatch} from "react-redux";
import {getUserInfo} from "../../redux/userSlice";

export default () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const validationSchema = object({
    username: string()
      .max(128, '用户名不能超过128位')
      .required('请输入用户名'),
    nickname: string()
      .max(128, '昵称不能超过128位')
      .required('请输入昵称'),
  });

  useEffect(() => {
    dispatch(getUserInfo(setLoading));
  }, []);

  return loading ? <Loading/> : <User {...{validationSchema}}/>;
};
