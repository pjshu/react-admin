import {createSlice} from "@reduxjs/toolkit";
import {formatTime} from "../helpers/datetime";

export const slice = createSlice({
  name: 'post',
  initialState: {
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
      avatar: '',
      motto: '',
      ICP: ''
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
  },
  reducers: {
    initTagForm(state) {
      const form = state[FORM.tags];
      Object.keys(form).forEach(key => {
        form[key] = '';
      });
      form.count = 0;
      form.image = {url: ''};
    },
    changeFormField(state, action) {
      const {form, ...values} = action.payload;
      Object.keys(values).forEach(key => {
        state[form][key] = values[key];
      });
    },
    changeFormError(state, action) {
      const {name, value} = action.payload;
      state.errors = {name, value};
    },
    clearFormError(state) {
      state.errors = {name: '', value: ''};
    }
  }
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

export const {changeFormField, changeFormError, clearFormError, initTagForm} = slice.actions;
export const selectForm = state => state.form;
export const selectFormError = state => state.form.error;
export default slice.reducer;

