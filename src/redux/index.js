import UserProvider from './userSlice';
import GlobalProvider, {GlobalContext} from './globalSlice';
import React, {useContext} from "react";

export default React.memo(function Provider({children}) {
  return (
    <UserProvider>
      <GlobalProvider>
        {children}
      </GlobalProvider>
    </UserProvider>
  );
});


//global slice
export const useGlobalAction = () => {
  const [, actions] = useContext(GlobalContext);
  return actions;
};

export const useGlobalStates = () => {
  const [state] = useContext(GlobalContext);
  return state;
};

export const useGlobalContext = () => {
  const [state, actions] = useContext(GlobalContext);
  return [state, actions];
};

// user slice
export const useUserAction = () => {
  const [, actions] = useContext(UserProvider);
  return actions;
};

export const useUserStates = () => {
  const [state] = useContext(UserProvider);
  return state;
};

export const useUserContext = () => {
  const [state, actions] = useContext(UserProvider);
  return [state, actions];
};


export const useSelectRegister = () => {
  const {register} = useUserStates();
  return register;
};


export const useSelectValidateCode = state => {
  const {resendTime, isSendCode} = useUserStates();
  return {resendTime, isSendCode};
};


export const useSelectForm = () => {
  const {register} = useUserStates();
  return register;
};

//form
