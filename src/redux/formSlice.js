import {createSlice} from "@reduxjs/toolkit";
import {formatTime} from "../helpers/datetime";
import useMethods from 'use-methods';
import React from "react";

const defaultValue = {
  post: {
    id: -1,
    title: '',
    tags: [],
    visibility: '私密',
    allTags: [],
    comments: 0,
    create_date: formatTime(new Date()),
    change_date: formatTime(new Date())
  },
  tags: {
    id: -1,
    name: '',
    describe: '',
    count: 0,
    image: {
      url: ''
    }
  },
  userInfo: {
    username: '',
    nickname: '',
    avatar: ''
  },
  resetPassword: {
    old_password: '', password: '', confirm_password: ''
  },
  resetEmail: {
    email: '', code: ''
  },
  register: {
    username: '',
    nickname: '',
    password: '',
    confirm_password: '',
    email: ''
  },
  // 重置密码时邮件验证
  recoveryPasswordSendCode: {
    email: '',
  },
  recoveryPassword: {
    code: '', password: '', confirm_password: ''
  },
  login: {
    username: '', password: ''
  },
  errors: {
    name: '', value: ''
  }
};

const methods = (state) => ({
  initTagForm() {
    const form = state[FORM.tags];
    Object.keys(form).forEach(key => {
      form[key] = '';
    });
    form.count = 0;
    form.image = {url: ''};
  },
  changeFormField({form, ...values}) {
    Object.keys(values).forEach(key => {
      state[form][key] = values[key];
    });
  },
  changeFormError({name, value}) {
    state.errors = {name, value};
  },
  clearFormError() {
    state.errors = {name: '', value: ''};
  }
});


export const FormContext = React.createContext();

export default React.memo(function FormProvider(children) {
  const [state, action] = useMethods(methods, defaultValue);
  return (
    <FormContext.Provider value={[state, action]}>
      {children}
    </FormContext.Provider>
  );
});

export const FORM = {
  recoveryPassword: 'recoveryPassword',
  recoveryPasswordSendCode: 'recoveryPasswordSendCode',
  login: 'login',
  register: 'register',
  userInfo: 'userInfo',
  resetEmail: 'resetEmail',
  resetPassword: 'resetPassword',
  post: 'post',
  tags: 'tags'
};

