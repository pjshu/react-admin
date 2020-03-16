import {createSlice} from '@reduxjs/toolkit';
import api from "../helpers/http";
import AlertMessage from "../components/AlertMessage";
import {toAdmin} from "../history";

export const slice = createSlice({
  name: 'user',
  initialState: {
    login: {
      username: '',
      password: ''
    },
    recoveryPassword: {
      initial: {
        email: '',
        code: '',
      },
      resendTime: 0,
      isSendCode: false
    }
  },
  reducers: {
    resetSendCodeTime(state) {
      state.recoveryPassword.resendTime = 60;
    },
    setIsSendCode(state) {
      state.recoveryPassword.isSendCode = true;
    },
    decSendCodeTime(state) {
      state.recoveryPassword -= 1;
    }
  },
});

export const {resetSendCodeTime, setIsSendCode, decSendCodeTime} = slice.actions;

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

export const recoveryPassword = values => dispatch => {
  const _recPassword = () => {
    api.RecPassword(values).then(res => {
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

export const selectLogin = state => state.user.login;
export const selectRecoveryPassword = state => state.user.recoveryPassword;

export default slice.reducer;
