import {createSlice} from '@reduxjs/toolkit';
import api from "../helpers/http";
import {toAdmin, toLogin} from "../history";
import {addErrorMessage, addSuccessMessage} from "./globalSlice";
import {changeFormField, FORM} from "./formSlice";

export const slice = createSlice({
  name: 'user',
  initialState: {
    register: {
      modalOpen: false,
      activeStep: 0
    },
    resendTime: 0,
    isSendCode: false
  },
  reducers: {
    resetSendCodeTime(state) {
      state.resendTime = 60;
    },
    clearRendCodeState(state) {
      state.resendTime = 0;
      state.isSendCode = false;
    },
    setIsSendCode(state) {
      state.isSendCode = true;
    },
    decSendCodeTime(state) {
      state.resendTime -= 1;
    },
    increaseActiveStep(state) {
      state.register.activeStep += 1;
    },
    decrementActiveStep(state) {
      state.register.activeStep -= 1;
    },
    closeModal(state) {
      state.register.modalOpen = false;
    },
    openModal(state) {
      state.register.modalOpen = true;
    },
  },
});

export const {resetSendCodeTime, setIsSendCode, decSendCodeTime, clearRendCodeState} = slice.actions;
export const {increaseActiveStep, decrementActiveStep, openModal, closeModal} = slice.actions;


export const login = values => dispatch => {
  api.login(values).then(res => {
    if (res.status === 'success') {
      const data = res.data;
      localStorage.setItem('identify', data.id);
      localStorage.setItem('Authorization', data.token);
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
      toLogin();
    } else {
      dispatch(addErrorMessage('登出失败'));
    }
  });
};


export const selectRegister = state => state.user.register;

export const selectValidateCode = state => ({
  resendTime: state.user.resendTime,
  isSendCode: state.user.isSendCode,
});


export default slice.reducer;
