// @flow
import {useDispatch} from "react-redux";
import {resetEmail, resetPassword} from "../redux/userSlice";
import {useCallback} from 'react';

export const useResetPassword: Function = () => {
  const dispatch = useDispatch();
  return useCallback((res) => {
    dispatch(resetPassword(res));
  }, [dispatch]);
};


export const useResetEmail: Function = () => {
  const dispatch = useDispatch();
  return useCallback((res) => {
    dispatch(resetEmail(res));
  }, [dispatch]);
};
