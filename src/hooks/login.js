import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {login} from "../redux/userSlice";

export const useSubmitLogin = () => {
  const dispatch = useDispatch();
  return useCallback((res) => {
    dispatch(login(res));
  }, [dispatch]);
};
