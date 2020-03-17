import {createSlice} from '@reduxjs/toolkit';
import api from "../helpers/http";
import AlertMessage from "../components/AlertMessage";
import {toAdmin, toLogin} from "../history";
import {createEditorState} from "../components/Editor";

export const slice = createSlice({
  name: 'user',
  initialState: {
    login: {
      loading: true,
      initial: {username: '', password: ''}
    },
    recoveryPassword: {
      initial: {email: '', code: ''},
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
        resetPasswordInit: {password: '', confirm_password: ''}
      }
    },
    userInfo: {
      initial: {
        username: '',
        nickname: '',
        about: createEditorState(null),
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
      state.isSendCode(false);
    },
    setIsSendCode(state) {
      state.isSendCode = true;
    },
    decSendCodeTime(state) {
      state.recoveryPassword -= 1;
    },
    increaseActiveStep(state) {
      state.activeStep += 1;
    },
    decrementActiveStep(state) {
      state.activeStep -= 1;
    },
    setUserEmail(state, action) {
      state.security.resetEmailInit = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo.initial = action.payload;
    },
    closeModal(state) {
      state.modalOpen = false;
    },
    openModal(state) {
      state.modalOpen = true;
    }
  },
});

export const {resetSendCodeTime, setIsSendCode, decSendCodeTime, clearRendCodeState} = slice.actions;
export const {increaseActiveStep, decrementActiveStep, openModal, closeModal} = slice.actions;
const {setUserEmail, setUserInfo} = slice.actions;

export const login = values => dispatch => {
  const _login = () => api.login(values).then(res => {
    if (res.status === 'success') {
      const data = res.data;
      localStorage.setItem('identify', data.id);
      localStorage.setItem('Authorization', data.token);
      AlertMessage.success(data.msg ? data.msg : '登录成功');
      toAdmin();
    } else {
      AlertMessage.failed('登录失败');
    }
  });
  dispatch(_login(values));
};

export const authLogin = setIsLoading => dispatch => {
  const _authLogin = (setIsLoading) => api.auth().then(res => {
    if (res.status === 'success') {
      toAdmin();
      AlertMessage.success('您已经登录');
    } else {
      setIsLoading(false);
    }
  });
  dispatch(_authLogin(setIsLoading));
};

export const recoveryPassword = values => dispatch => {
  const _recPassword = () => {
    api.RecPassword(values).then(res => {
      // TODO res... ===success
      if (res) {
        dispatch(clearRendCodeState());
      }
      console.log(res);
    });
  };
  dispatch(_recPassword(values));
};

export const sendRecPassCode = values => dispatch => {
  const _sendRecPassCode = (values) => api.sendRecPassCode({email: values.email}).then(res => {
    if (res.status === 'success') {
      AlertMessage.success('发送成功,请检查邮箱');
    } else {
      AlertMessage.failed(res.data.msg);
    }
  });
  dispatch(_sendRecPassCode(values));
};

export const asyncDecSendCodeTime = () => dispatch => {
  const _asyncDecSendCodeTime = () => setTimeout(() => {
    dispatch(decSendCodeTime());
  }, 1000);
  dispatch(_asyncDecSendCodeTime());
};

export const register = (values) => dispatch => {
  const _register = (data) => api.register(data).then(res => {
    if (res.status === 'success') {
      AlertMessage.success('注册成功');
      toLogin();
    } else {
      AlertMessage.failed(res.data.msg);
    }
  });
  dispatch(_register(values));
};

export const sendRestEmailCode = () => dispatch => {
  const _sendRestEmailCode = () => api.sendRestEmailCode().then(res => {
    if (res.status === 'success') {
      AlertMessage.success('验证码发送成,请查收邮箱');
    } else {
      AlertMessage.failed(res.data.msg);
    }
  });
  dispatch(_sendRestEmailCode());
};

export const resetEmail = (values) => dispatch => {
  const _resetEmail = (values) => api.resetEmail(values).then(res => {
    console.log(res);
    if (res.status === 'success') {
      AlertMessage.success('修改成功');
    } else {
      AlertMessage.failed(res.data.msg);
    }
  });
  dispatch(_resetEmail(values));
};

export const resetPassword = (values) => dispatch => {
  const _resetPassword = (values) => api.resetPassword(values).then(res => {
    if (res.status === 'success') {
      AlertMessage.success('修改成功');
    } else {
      /**
       * data.msg.old_password.[0: "error"]
       */
      // AlertMessage.failed(res.data.msg);
    }
  });
  dispatch(_resetPassword(_resetPassword(values)));
};

export const getUserEmail = (setLoading) => dispatch => {
  const _getUserEmail = () => api.getUserInfo().then(res => {
    const data = res.data;
    dispatch(setUserEmail(data.email));
  });
  dispatch(_getUserEmail(setLoading));
};

export const getUserInfo = (setLoading) => dispatch => {
  const _getUserInfo = (setLoading) => api.getUserInfo().then(res => {
    const data = res.data;
    data.about = createEditorState(data.about);
    dispatch(setUserInfo);
    setLoading(false);
  });
  dispatch(_getUserInfo(setLoading));
};

export const modifyUserInfo = (values) => dispatch => {
  const _modifyUserInfo = (data) => api.modifyUserInfo(data).then(res => {
    if (res.status === 'success') {
      AlertMessage.success('修改成功');
    }
  });
  dispatch(_modifyUserInfo(values));
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
