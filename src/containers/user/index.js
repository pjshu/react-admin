import User from './User';
import React from "react";
import {object, string} from "yup";
import {AsyncLoading} from "../../components/Loading";

export default () => {
  const validationSchema = object({
    username: string()
      .max(128, '用户名不能超过128位')
      .required('请输入用户名'),
    nickname: string()
      .max(128, '昵称不能超过128位')
      .required('请输入昵称'),
  });
  return <AsyncLoading render={(setLoading) => <User {...{validationSchema, setLoading}}/>}/>;
};
