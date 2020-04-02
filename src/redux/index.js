import {
  selectLogin,
  selectRecoveryPassword,
  selectRegister,
  selectSecurity,
  selectUserInfo
} from "./userSlice";
import {selectPost} from './postSlice';
import {
  changeFormField as changeUserForm,
} from './userSlice';

import {
  changePostFormField,
} from './postSlice';

export const selects = {
  recoveryPassword: selectRecoveryPassword,
  login: selectLogin,
  register: selectRegister,
  userInfo: selectUserInfo,
  security: selectSecurity,
  post: selectPost
};

export const changeFormField = {
  recoveryPassword(props) {
    return changeUserForm({...props, form: 'recoveryPassword'});
  },
  login(props) {
    return changeUserForm({...props, form: 'login'});
  },
  post(props) {
    return changePostFormField(props);
  }
};
