import {createSelector, createSlice} from "@reduxjs/toolkit";
import {fromJS} from "immutable";
import {reducers} from "./index";

const defaultData = {
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
export const slice = createSlice({
  name: 'unAuthForm',
  initialState: fromJS(defaultData),
  reducers: reducers
});

export const {changeFormField, changeFormError, clearFormError} = slice.actions;
export const selectForm = state => state.form;

export const errorSelector = state => state.form.get('errors');

export const createFieldSelector = (field) => createSelector(
  selectForm,
  state => state.getIn(field)
);

export const createFormSelector = (formName) => createSelector(
  selectForm,
  state => state.get(formName)
);

export default slice.reducer;
