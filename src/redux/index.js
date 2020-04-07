import {
  selectLogin,
  selectRecoveryPassword,
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

export const FORM = {
  recoveryPassword: 'recoveryPassword',
  recoveryPasswordRendCode: 'recoveryPasswordRendCode',
  login: 'login',
  register: 'register',
  userInfo: 'userInfo',
  resetEmail: 'resetEmail',
  resetPassword: 'resetPassword',
  post: 'post',
  tags: 'tags'
};

export const selects = {
  [FORM.recoveryPassword]: selectRecoveryPassword,
  [FORM.login]: selectLogin,
  [FORM.register]: selectRegister,
  [FORM.userInfo]: selectUserInfo,
  [FORM.resetEmail]: selectResetEmail,
  [FORM.resetPassword]: selectResetPassword,
  [FORM.post]: selectPost,
  [FORM.tags]: selectTag
};

export const changeFormField = {
  [FORM.recoveryPassword](props) {
    return changeUserFormField({...props, form: FORM.recoveryPassword});
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

export const clearFormErrors = {
  [FORM.recoveryPassword]() {
    return clearUserFormError(FORM.recoveryPassword);
  },
  [FORM.login]() {
    return clearUserFormError(FORM.login);
  },
  [FORM.userInfo]() {
    return clearUserFormError(FORM.userInfo);
  },
  [FORM.resetEmail]() {
    return clearUserFormError(FORM.resetEmail);
  },
  [FORM.resetPassword]() {
    return clearUserFormError( FORM.resetPassword);
  },
  [FORM.post]() {
    return clearPostFormError();
  },
  [FORM.tags]() {
    return clearTagsFormError();
  },
};
