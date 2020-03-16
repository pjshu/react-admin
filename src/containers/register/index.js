import Register from "./Register";
import React, {useEffect, useState} from 'react';
import {number, object, ref, string} from "yup";
import api from "../../helpers/http";
import Loading from "../../components/Loading";
import AlertMessage from "../../components/AlertMessage";


function Index() {
  const [loading, setLoading] = useState(true);
  const validationSchema = object({
    user: object({
      username: string()
        .max(128, '用户名不能超过128位')
        .required('请输入用户名'),
      nickname: string()
        .max(128, '昵称不能超过128位')
        .required('请输入昵称'),
      password: string()
        .min(6, '密码至少六位')
        .max(20, '密码不能超过30位')
        .required('请输入密码'),
      confirm_password: string()
        .oneOf([ref('password'), null], "密码不匹配")
        .min(6, '密码至少六位')
        .max(20, '密码不能超过30位')
        .required('请确认密码'),
    }),
    email: object({
      email: string()
        .email('请输入正确的邮箱格式')
    })
  });
  useEffect(() => {
    api.checkRegister().then(res => {
      console.log(res);
      if (res.status && res.status === 'success') {
        setLoading(false);
      } else {
        AlertMessage.failed('您已注册');
      }
    });
  }, []);
  return loading ?
    <Loading/> :
    <Register {...{validationSchema}}/>;
}

export default Index;
