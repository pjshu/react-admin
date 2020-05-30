import {useDispatch, useSelector} from "react-redux";
import {recoveryPassword, resetSendCodeTime, sendRecPassCode} from "../redux/userSlice";
import {createFieldSelector} from "../redux/formSlice";
import FORM from "../contants/form.json";
import {useCallback} from 'react';

export const useRecPassFormRendCode: Function = () => {
  const dispatch = useDispatch();
  return useCallback((res) => {
    dispatch(resetSendCodeTime());
    dispatch(sendRecPassCode(res));
  }, [dispatch]);
};

export const useSubmitRecPass: Function = () => {
  const dispatch = useDispatch();
  const email = useSelector(createFieldSelector([FORM.recoveryPasswordSendCode, 'email']));
  return useCallback((values: Object) => {
    dispatch(recoveryPassword({...values, email}));
  }, [dispatch, email]);
};
