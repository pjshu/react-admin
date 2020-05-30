// @flow

import {useDispatch} from "react-redux";
import {addTagImg, modifyTag} from "../redux/tagSlice";
import {useCallback} from 'react';

export const useSubmitTagsForm: Function = ({updateHandler, addMultiple}: Object<Function>) => {
  const dispatch = useDispatch();
  return useCallback((value: Object) => {
    dispatch(modifyTag(value, updateHandler));
    dispatch(addTagImg(value, updateHandler));
    addMultiple();
  }, [addMultiple, dispatch, updateHandler]);
};
