// @flow

import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {blob2Base64} from "../helpers/misc";
import {convertEditorState} from '../components/editor/helper';
import {modifyUserInfo} from "../redux/userSlice";

export const useSubmitUserInfo: Function = () => {
  const dispatch = useDispatch();
  return useCallback(async (res) => {
    const data = {...res};
    convertEditorState(data, 'about');
    if (data.avatar) {
      data.avatar = await blob2Base64(data.avatar);
    }
    dispatch(modifyUserInfo(data));
  }, [dispatch]);
};
