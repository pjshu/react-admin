import {createSlice} from '@reduxjs/toolkit';
import api from "../helpers/api/security";
import commonApi from "../helpers/api/common";
import {toAdmin, toLogin} from "../history";
import {addErrorMessage, addSuccessMessage} from "./globalSlice";
import {changeFormField} from "./formSlice";
import FORM from "../contants/form.json";
import {fromJS} from "immutable";

export const slice = createSlice({
  name: 'user',
  initialState: fromJS({
    register: {
      modalOpen: false,
      activeStep: 0
    },
    resendTime: 0,
    isSendCode: false
  }),
  reducers: {
    resetSendCodeTime(state) {
      return state.update('resendTime', () => 60);
    },
    clearRendCodeState(state) {
      return state.merge({
        isSendCode: false,
        resendTime: 0
      });
    },
    setIsSendCode(state) {
      return state.update('isSendCode', () => true);
    },
    decSendCodeTime(state) {
      return state.update('resendTime', (value) => value - 1);
    },
    increaseActiveStep(state) {
      return state.updateIn(['register', 'activeStep'], (value) => value + 1);
    },
    decrementActiveStep(state) {
      return state.updateIn(['register', 'activeStep'], (value) => value - 1);
    },
    closeModal(state) {
      return state.updateIn(['register', 'modalOpen'], () => false);
    },
    openModal(state) {
      return state.updateIn(['register', 'modalOpen'], () => true);
    },
  },
});

export const {resetSendCodeTime, setIsSendCode, decSendCodeTime, clearRendCodeState} = slice.actions;
export const {increaseActiveStep, decrementActiveStep, openModal, closeModal} = slice.actions;


export const login = values => dispatch => {
  commonApi.login(values).then(res => {
    if (res.status === 'success') {
      toAdmin();
      dispatch(addSuccessMessage('登录成功'));
    } else {
      dispatch(addErrorMessage('登录失败'));
    }
  });
};

export const recoveryPassword = values => dispatch => {
  api.RecPassword(values).then(res => {
    if (res.status === 'success') {
      dispatch(addSuccessMessage('密码修改成功'));
      toLogin();
      dispatch(clearRendCodeState());
    } else {
      dispatch(addErrorMessage('密码修改失败'));
    }
  });
};

export const sendRecPassCode = values => dispatch => {
  api.sendRecPassCode(values).then(res => {
    if (res.status === 'success') {
      dispatch(setIsSendCode());
      dispatch(addSuccessMessage('邮件发送成功,请检查邮箱'));
    } else {
      dispatch(addErrorMessage(res.data.msg));
    }
  });
};

export const asyncDecSendCodeTime = () => dispatch => {
  setTimeout(() => {
    dispatch(decSendCodeTime());
  }, 1000);
};

export const register = (values) => dispatch => {
  api.register(values).then(res => {
    if (res.status === 'success') {
      dispatch(addSuccessMessage('注册成功'));
      toLogin();
    } else {
      dispatch(addErrorMessage(res.data.msg));
    }
  });
};

export const checkRegister = (setLoading) => dispatch => {
  api.checkRegister().then(res => {
    if (res.status && res.status === 'success') {
      setLoading(false);
    } else {
      dispatch(addSuccessMessage('您已注册'));
    }
  });
};

export const sendRestEmailCode = () => dispatch => {
  api.sendRestEmailCode().then(res => {
    if (res.status === 'success') {
      dispatch(addSuccessMessage('验证码发送成,请查收邮箱'));
    } else {
      dispatch(addErrorMessage(res.data.msg));
    }
  });
};

export const resetEmail = (values) => dispatch => {
  api.resetEmail(values).then(res => {
    if (res.status === 'success') {
      dispatch(addSuccessMessage('邮件修改成功'));
    } else {
      dispatch(addErrorMessage(res.data.msg));
    }
  });
};

export const resetPassword = (values) => dispatch => {
  api.resetPassword(values).then(res => {
    if (res.status === 'success') {
      dispatch(addSuccessMessage('密码修改成功'));
    } else {
      dispatch(addErrorMessage('密码修改失败'));
      /**
       * data.msg.old_password.[0: "error"]
       */
    }
  });
};

export const getUserInfo = (setLoading) => dispatch => {
  api.getUserInfo().then(res => {
    if (res.status === 'success') {
      dispatch(changeFormField({...res.data, form: FORM.userInfo}));
      setLoading(false);
    } else {
      dispatch(addErrorMessage('获取用户信息失败'));
    }
  });
};

export const modifyUserInfo = (values) => dispatch => {
  api.modifyUserInfo(values).then(res => {
    if (res.status === 'success') {
      dispatch(addSuccessMessage('用户信息修改成功'));
    } else {
      dispatch(addErrorMessage('用户信息修改失败'));
    }
  });
};

export const logout = () => dispatch => {
  api.logout().then(res => {
    if (res.status === 'success') {
      localStorage.removeItem('identify');
      localStorage.removeItem('Authorization');
      toLogin();
    } else {
      dispatch(addErrorMessage('登出失败'));
    }
  });
};


export const selectResendTime = state => state.user.get('resendTime');
export const selectIsSendCode = state => state.user.get('isSendCode');
export const selectModalOpen = state => state.user.getIn(['register', 'modalOpen']);
export const selectActiveStep = state => state.user.getIn(['register', 'activeStep']);
export default slice.reducer;
