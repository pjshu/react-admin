import {createSlice} from '@reduxjs/toolkit';
import api from "../helpers/http";
import {toAdmin, toLogin} from "../history";
import {addErrorMessage, addSuccessMessage} from "./globalSlice";

export const slice = createSlice({
  name: 'user',
  initialState: {
    login: {
      form: {username: '', password: ''},
      errors: {name: '', value: ''}
    },
    recoveryPassword: {
      form: {email: '', code: '', password: '', confirm_password: ''},
      errors: {name: '', value: ''}
    },
    register: {
      form: {
        username: '',
        nickname: '',
        password: '',
        confirm_password: '',
        email: ''
      },
      errors: {name: '', value: ''},
      modalOpen: false,
      activeStep: 0
    },
    resetEmail: {
      form: {
        email: '', code: ''
      },
      errors: {name: '', value: ''},
    },
    resetPassword: {
      form: {
        old_password: '', password: '', confirm_password: ''
      },
      errors: {name: '', value: ''},
    },
    userInfo: {
      form: {
        username: '',
        nickname: '',
        about: null,
        avatar: ''
      },
      errors: {name: '', value: ''},
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
    setUserEmail(state, action) {
      state.resetEmail.form.email = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo.form = action.payload;
    },
    closeModal(state) {
      state.register.modalOpen = false;
    },
    openModal(state) {
      state.register.modalOpen = true;
    },
    changeFormField(state, action) {
      const {name, value, form} = action.payload;
      state[form].form[name] = value;
    },
    changeFormError(state, action) {
      let {name, value, form} = action.payload;
      state[form].errors = {name, value};
    },
    clearFormError(state, action) {
      let form = action.payload;
      state[form].errors = {name: '', value: ''};
    }
  },
});

export const {resetSendCodeTime, setIsSendCode, decSendCodeTime, clearRendCodeState} = slice.actions;
export const {increaseActiveStep, decrementActiveStep, openModal, closeModal} = slice.actions;
export const {changeFormField, changeFormError, clearFormError} = slice.actions;
const {setUserEmail, setUserInfo} = slice.actions;

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

export const getUserEmail = (setLoading) => dispatch => {
  api.getUserInfo().then(res => {
    const {data, status} = res;
    if (status === 'success') {
      dispatch(setUserEmail(data.email));
      setLoading(false);
    } else {
      dispatch(addErrorMessage('获取邮件信息失败'));
    }
  });
};

export const getUserInfo = (setLoading) => dispatch => {
  api.getUserInfo().then(res => {
    if (res.status === 'success') {
      dispatch(setUserInfo(res.data));
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

export const selectLogin = state => state.user.login;

export const selectRecoveryPassword = state => state.user.recoveryPassword;

export const selectRegister = state => state.user.register;

export const selectUserInfo = state => state.user.userInfo;

export const selectValidateCode = state => ({
  resendTime: state.user.resendTime,
  isSendCode: state.user.isSendCode,
});

export const selectResetEmail = state => state.user.resetEmail;

export const selectResetPassword = state => state.user.resetPassword;

export default slice.reducer;
