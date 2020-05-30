// @flow

import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {closeModal, register} from "../redux/userSlice";

export const useSubmitRegister: Function = () => {
  const dispatch = useDispatch();
  return useCallback((res) => {
    dispatch(closeModal());
    dispatch(register(res));
  }, [dispatch]);
};
