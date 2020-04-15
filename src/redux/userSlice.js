import {createSlice} from '@reduxjs/toolkit';
import api from "../helpers/http";
import {useRouter} from "../hook";
import {addErrorMessage, addSuccessMessage} from "./globalSlice";
import {changeFormField, FORM} from "./formSlice";
import {useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {useCallback} from "react";

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


export const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return useCallback((values) => {
    return api.login(values).then(res => {
      if (res.status === 'success') {
        const data = res.data;
        localStorage.setItem('identify', data.id);
        localStorage.setItem('Authorization', data.token);
        router.toAdmin();
        dispatch(addSuccessMessage('登录成功'));
      } else {
        dispatch(addErrorMessage('登录失败'));
      }
    });
  }, [dispatch, router]);
};

export const useRecoveryPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return useCallback((values) =>
    api.RecPassword(values).then(res => {
      if (res.status === 'success') {
        dispatch(addSuccessMessage('密码修改成功'));
        router.toLogin();
        dispatch(clearRendCodeState());
      } else {
        dispatch(addErrorMessage('密码修改失败'));
      }
    }), [dispatch, router]);
};

export const useSendRecPassCode = () => {
  const dispatch = useDispatch();
  return useCallback((values) =>
    api.sendRecPassCode(values).then(res => {
      if (res.status === 'success') {
        dispatch(setIsSendCode());
        dispatch(addSuccessMessage('邮件发送成功,请检查邮箱'));
      } else {
        dispatch(addErrorMessage(res.data.msg));
      }
    }), [dispatch]);
};

export const useAsyncDecSendCodeTime = () => {
  const dispatch = useDispatch();
  return useCallback(() =>
      setTimeout(() => {
        dispatch(decSendCodeTime());
      }, 1000)
    , [dispatch]);
};

export const useRegister = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return useCallback((values) =>
    api.register(values).then(res => {
      if (res.status === 'success') {
        dispatch(addSuccessMessage('注册成功'));
        router.toLogin();
      } else {
        dispatch(addErrorMessage(res.data.msg));
      }
    }), [dispatch, router]);
};

export const useCheckRegister = () => {
  const dispatch = useDispatch();
  return useCallback((setLoading) =>
    api.checkRegister().then(res => {
      if (res.status && res.status === 'success') {
        setLoading(false);
      } else {
        dispatch(addSuccessMessage('您已注册'));
      }
    }), [dispatch]);
};

export const useSendRestEmailCode = () => {
  const dispatch = useDispatch();
  return useCallback(() =>
    api.sendRestEmailCode().then(res => {
      if (res.status === 'success') {
        dispatch(addSuccessMessage('验证码发送成,请查收邮箱'));
      } else {
        dispatch(addErrorMessage(res.data.msg));
      }
    }), [dispatch]);
};

export const useResetEmail = () => {
  const dispatch = useDispatch();
  return useCallback((values) =>
    api.resetEmail(values).then(res => {
      if (res.status === 'success') {
        dispatch(addSuccessMessage('邮件修改成功'));
      } else {
        dispatch(addErrorMessage(res.data.msg));
      }
    }), [dispatch]);
};

export const useResetPassword = () => {
  const dispatch = useDispatch();
  return useCallback((values) =>
    api.resetPassword(values).then(res => {
      if (res.status === 'success') {
        dispatch(addSuccessMessage('密码修改成功'));
      } else {
        dispatch(addErrorMessage('密码修改失败'));
        /**
         * data.msg.old_password.[0: "error"]
         */
      }
    }), [dispatch]);
};

export const useGetUserInfo = () => {
  const dispatch = useDispatch();
  return useCallback((setLoading) =>
    api.getUserInfo().then(res => {
      if (res.status === 'success') {
        dispatch(changeFormField({...res.data, form: FORM.userInfo}));
        setLoading(false);
      } else {
        dispatch(addErrorMessage('获取用户信息失败'));
      }
    }), [dispatch]);
};

export const useModifyUserInfo = () => {
  const dispatch = useDispatch();
  return useCallback((values) =>
    api.modifyUserInfo(values).then(res => {
      if (res.status === 'success') {
        dispatch(addSuccessMessage('用户信息修改成功'));
      } else {
        dispatch(addErrorMessage('用户信息修改失败'));
      }
    }), [dispatch]);
};

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return useCallback(() =>
    api.logout().then(res => {
      if (res.status === 'success') {
        router.toLogin();
      } else {
        dispatch(addErrorMessage('登出失败'));
      }
    }), [dispatch, router]);
};


export const selectRegister = state => state.user.register;

export const selectValidateCode = state => ({
  resendTime: state.user.resendTime,
  isSendCode: state.user.isSendCode,
});


export default slice.reducer;
