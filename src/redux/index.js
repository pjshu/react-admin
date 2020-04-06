import {
  selectLogin,
  selectRecoveryPassword,
  selectRegister,
  selectSecurity,
  selectUserInfo
} from "./userSlice";

import {changeTagsFormField} from './tagSlice';
import {changePostFormField} from './postSlice';
import {selectPost} from './postSlice';
import {selectTag} from './tagSlice';
import {
  changeFormField as changeUserForm,
} from './userSlice';


export const selects = {
  recoveryPassword: selectRecoveryPassword,
  login: selectLogin,
  register: selectRegister,
  userInfo: selectUserInfo,
  security: selectSecurity,
  post: selectPost,
  tags: selectTag
};

export const changeFormField = {
  recoveryPassword(props) {
    return changeUserForm({...props, form: 'recoveryPassword'});
  },
  login(props) {
    return changeUserForm({...props, form: 'login'});
  },
  userInfo(props) {
    return changeUserForm({...props, form: 'userInfo'});
  },
  security(props) {
    return changeUserForm({...props, form: 'security'});
  },
  post(props) {
    return changePostFormField(props);
  },
  tags(props) {
    return changeTagsFormField(props);
  }
};
