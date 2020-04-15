import React, {useCallback} from 'react';
import api from "../helpers/http";
import {useRouter} from "../hook";
import {changeFormField, FORM} from "./formSlice";
import useMethods from 'use-methods';
import {useGlobalAction, useUserAction} from "./index";

const defaultValue = {
  register: {
    modalOpen: false,
    activeStep: 0
  },
  resendTime: 0,
  isSendCode: false
};

const methods = state => ({
  resetSendCodeTime() {
    state.resendTime = 60;
  },
  clearRendCodeState() {
    state.resendTime = 0;
    state.isSendCode = false;
  },
  setIsSendCode() {
    state.isSendCode = true;
  },
  decSendCodeTime() {
    state.resendTime -= 1;
  },
  increaseActiveStep() {
    state.register.activeStep += 1;
  },
  decrementActiveStep() {
    state.register.activeStep -= 1;
  },
  closeModal() {
    state.register.modalOpen = false;
  },
  openModal() {
    state.register.modalOpen = true;
  },
});

export const UserContext = React.createContext();

export default React.memo(function UserProvider(children) {
  const [state, action] = useMethods(methods, defaultValue);
  return (
    <UserContext.Provider value={[state, action]}>
      {children}
    </UserContext.Provider>
  );
});


export const useLoginApi = () => {
  const {addSuccessMessage, addErrorMessage} = useGlobalAction();
  const router = useRouter();
  return useCallback((values) => {
    return api.login(values).then(res => {
      if (res.status === 'success') {
        const data = res.data;
        localStorage.setItem('identify', data.id);
        localStorage.setItem('Authorization', data.token);
        router.toAdmin();
        addSuccessMessage('登录成功');
      } else {
        addErrorMessage('登录失败');
      }
    });
  }, [addErrorMessage, addSuccessMessage, router]);
};

export const useRecoveryPasswordApi = () => {
  const router = useRouter();
  const {addSuccessMessage, addErrorMessage} = useGlobalAction();
  const {clearRendCodeState} = useUserAction();
  return useCallback((values) =>
    api.RecPassword(values).then(res => {
      if (res.status === 'success') {
        addSuccessMessage('密码修改成功');
        router.toLogin();
        clearRendCodeState();
      } else {
        addErrorMessage('密码修改失败');
      }
    }), [addErrorMessage, addSuccessMessage, clearRendCodeState, router]);
};

export const useSendRecPassCodeApi = () => {
  const {addSuccessMessage, addErrorMessage} = useGlobalAction();
  const {setIsSendCode} = useUserAction();
  return useCallback((values) =>
    api.sendRecPassCode(values).then(res => {
      if (res.status === 'success') {
        setIsSendCode();
        addSuccessMessage('邮件发送成功,请检查邮箱');
      } else {
        addErrorMessage(res.data.msg);
      }
    }), [addErrorMessage, addSuccessMessage, setIsSendCode]);
};

export const useAsyncDecSendCodeTimeApi = () => {
  const {decSendCodeTime} = useUserAction();
  return useCallback(() =>
      setTimeout(() => {
        decSendCodeTime();
      }, 1000)
    , [decSendCodeTime]);
};

export const useRegister = () => {
  const router = useRouter();
  const {addSuccessMessage, addErrorMessage} = useGlobalAction();
  return useCallback((values) =>
    api.register(values).then(res => {
      if (res.status === 'success') {
        addSuccessMessage('注册成功');
        router.toLogin();
      } else {
        addErrorMessage(res.data.msg);
      }
    }), [addErrorMessage, addSuccessMessage, router]);
};

export const useCheckRegister = () => {
  const {addSuccessMessage} = useGlobalAction();
  return useCallback((setLoading) =>
    api.checkRegister().then(res => {
      if (res.status && res.status === 'success') {
        setLoading(false);
      } else {
        addSuccessMessage('您已注册');
      }
    }), [addSuccessMessage]);
};

export const useSendRestEmailCodeApi = () => {
  const {addSuccessMessage, addErrorMessage} = useGlobalAction();
  return useCallback(() =>
    api.sendRestEmailCode().then(res => {
      if (res.status === 'success') {
        addSuccessMessage('验证码发送成,请查收邮箱');
      } else {
        addErrorMessage(res.data.msg);
      }
    }), [addErrorMessage, addSuccessMessage]);
};

export const useResetEmailApi = () => {
  const {addSuccessMessage, addErrorMessage} = useGlobalAction();
  return useCallback((values) =>
    api.resetEmail(values).then(res => {
      if (res.status === 'success') {
        addSuccessMessage('邮件修改成功');
      } else {
        addErrorMessage(res.data.msg);
      }
    }), [addErrorMessage, addSuccessMessage]);
};

export const useResetPasswordApi = () => {
  const {addSuccessMessage, addErrorMessage} = useGlobalAction();
  return useCallback((values) =>
    api.resetPassword(values).then(res => {
      if (res.status === 'success') {
        addSuccessMessage('密码修改成功');
      } else {
        addErrorMessage('密码修改失败');
        /**
         * data.msg.old_password.[0: "error"]
         */
      }
    }), [addErrorMessage, addSuccessMessage]);
};

export const useGetUserInfoApi = () => {
  const {addErrorMessage} = useGlobalAction();
  return useCallback((setLoading) =>
    api.getUserInfo().then(res => {
      if (res.status === 'success') {
        changeFormField({...res.data, form: FORM.userInfo});
        setLoading(false);
      } else {
        addErrorMessage('获取用户信息失败');
      }
    }), [addErrorMessage]);
};

export const useModifyUserInfoApi = () => {
  const {addSuccessMessage, addErrorMessage} = useGlobalAction();
  return useCallback((values) =>
    api.modifyUserInfo(values).then(res => {
      if (res.status === 'success') {
        addSuccessMessage('用户信息修改成功');
      } else {
        addErrorMessage('用户信息修改失败');
      }
    }), [addErrorMessage, addSuccessMessage]);
};

export const useLogoutApi = () => {
  const router = useRouter();
  const {addErrorMessage} = useGlobalAction();
  return useCallback(() =>
    api.logout().then(res => {
      if (res.status === 'success') {
        router.toLogin();
      } else {
        addErrorMessage('登出失败');
      }
    }), [addErrorMessage, router]);
};
