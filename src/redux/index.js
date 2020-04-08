import {
  selectLogin,
  selectRecoveryPassword, selectRecoveryPasswordSendCode,
  selectRegister,
  selectResetEmail,
  selectResetPassword,
  selectUserInfo
} from "./userSlice";

import {changeTagsFormField, changeTagsFormError, clearTagsFormError} from './tagSlice';
import {changePostFormField, changePostFormError, clearPostFormError} from './postSlice';
import {selectPost} from './postSlice';
import {selectTag} from './tagSlice';
import {
  changeFormField as changeUserFormField,
  changeFormError as changeUserFormError,
  clearFormError as clearUserFormError
} from './userSlice';

// TODO : 删除重复代码
// TODO 某些字段为了分开验证,被一分为二,比如security被拆分为resetEmail与resetPassword,重新设计,减少冗余代码
// 表单名
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

// 所有包含表单的select,统一导出
export const selects = {
  [FORM.recoveryPassword]: selectRecoveryPassword,
  [FORM.recoveryPasswordSendCode]: selectRecoveryPasswordSendCode,
  [FORM.login]: selectLogin,
  [FORM.register]: selectRegister,
  [FORM.userInfo]: selectUserInfo,
  [FORM.resetEmail]: selectResetEmail,
  [FORM.resetPassword]: selectResetPassword,
  [FORM.post]: selectPost,
  [FORM.tags]: selectTag
};

//修改表单字段方法,统一导出
export const changeFormField = {
  [FORM.recoveryPassword](props) {
    return changeUserFormField({...props, form: FORM.recoveryPassword});
  },
  [FORM.recoveryPasswordSendCode](props) {
    return changeUserFormField({...props, form: FORM.recoveryPasswordSendCode});
  },
  [FORM.register](props) {
    return changeUserFormField({...props, form: FORM.register});
  },
  [FORM.login](props) {
    return changeUserFormField({...props, form: FORM.login});
  },
  [FORM.userInfo](props) {
    return changeUserFormField({...props, form: FORM.userInfo});
  },
  [FORM.resetEmail](props) {
    return changeUserFormField({...props, form: FORM.resetEmail});
  },
  [FORM.resetPassword](props) {
    return changeUserFormField({...props, form: FORM.resetPassword});
  },
  [FORM.post](props) {
    return changePostFormField(props);
  },
  [FORM.tags](props) {
    return changeTagsFormField(props);
  },
};
// 修改表单错误,统一导出
export const changeFormErrors = {
  [FORM.recoveryPassword](props) {
    return changeUserFormError({...props, form: FORM.recoveryPassword});
  },
  [FORM.login](props) {
    return changeUserFormError({...props, form: FORM.login});
  },
  [FORM.userInfo](props) {
    return changeUserFormError({...props, form: FORM.userInfo});
  },
  [FORM.recoveryPasswordSendCode](props) {
    return changeUserFormError({...props, form: FORM.recoveryPasswordSendCode});
  },
  [FORM.register](props) {
    return changeUserFormError({...props, form: FORM.register});
  },
  [FORM.resetEmail](props) {
    return changeUserFormError({...props, form: FORM.resetEmail});
  },
  [FORM.resetPassword](props) {
    return changeUserFormError({...props, form: FORM.resetPassword});
  },
  [FORM.post](props) {
    return changePostFormError(props);
  },
  [FORM.tags](props) {
    return changeTagsFormError(props);
  },
};

// 清除表单错误,统一导出
export const clearFormErrors = {
  [FORM.recoveryPassword]() {
    return clearUserFormError(FORM.recoveryPassword);
  },
  [FORM.login]() {
    return clearUserFormError(FORM.login);
  },
  [FORM.recoveryPasswordSendCode](props) {
    return clearUserFormError({...props, form: FORM.recoveryPasswordSendCode});
  },
  [FORM.register](props) {
    return clearUserFormError({...props, form: FORM.register});
  },
  [FORM.userInfo]() {
    return clearUserFormError(FORM.userInfo);
  },
  [FORM.resetEmail]() {
    return clearUserFormError(FORM.resetEmail);
  },
  [FORM.resetPassword]() {
    return clearUserFormError(FORM.resetPassword);
  },
  [FORM.post]() {
    return clearPostFormError();
  },
  [FORM.tags]() {
    return clearTagsFormError();
  },
};
