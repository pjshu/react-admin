import {createSlice} from '@reduxjs/toolkit';
import api from "../helpers/http";
import AlertMessage from "../components/AlertMessage";
import {toAdmin, toLogin} from "../history";
import {addSuccessMessage, addErrorMessage} from "./globalSlice";

export const slice = createSlice({
  name: 'user',
  initialState: {
    login: {
      initial: {username: '', password: ''}
    },
    recoveryPassword: {
      initial: {email: '', code: '', password: '', confirm_password: ''},
    },
    register: {
      initial: {
        user: {username: '', nickname: '', password: '', confirm_password: ''},
        email: {email: ''}
      },
      modalOpen: false,
      activeStep: 0
    },
    security: {
      initial: {
        resetEmailInit: {email: '', code: ''},
        resetPasswordInit: {old_password: '', password: '', confirm_password: ''}
      }
    },
    userInfo: {
      initial: {
        username: '',
        nickname: '',
        about: null,
        avatar: ''
      }
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
      state.security.initial.resetEmailInit.email = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo.initial = action.payload;
    },
    closeModal(state) {
      state.register.modalOpen = false;
    },
    openModal(state) {
      state.register.modalOpen = true;
    }
  },
});

export const {resetSendCodeTime, setIsSendCode, decSendCodeTime, clearRendCodeState} = slice.actions;
export const {increaseActiveStep, decrementActiveStep, openModal, closeModal} = slice.actions;
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

export const authLogin = setLoading => dispatch => {
  api.auth().then(res => {
    if (res.status === 'success') {
      toAdmin();
      dispatch(addSuccessMessage('您已登录'));
    } else {
      //TODO:
      setLoading(false);
      dispatch(addErrorMessage('登录失败'));
    }
  });
};

export const recoveryPassword = values => dispatch => {
  api.RecPassword(values).then(res => {
    // TODO res... === success
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
  api.sendRecPassCode({email: values.email}).then(res => {
    if (res.status === 'success') {
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
      // AlertMessage.failed(res.data.msg);
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
      dispatch(addSuccessMessage('用户信息修改成功'))
    }else {
      dispatch(addErrorMessage('用户信息修改失败'))
    }
  });
};

export const selectLogin = state => state.user.login;

export const selectRecoveryPassword = state => ({
  ...state.user.recoveryPassword,
  resendTime: state.user.resendTime,
  isSendCode: state.user.isSendCode,
});

export const selectRegister = state => state.user.register;
export const selectUserInfo = state => state.user.userInfo;

export const selectSecurity = state => ({
  ...state.user.security,
  resendTime: state.user.resendTime,
  isSendCode: state.user.isSendCode,
});

export default slice.reducer;
