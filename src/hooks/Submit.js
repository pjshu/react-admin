// @flow

import {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeFormError, clearFormError, createFormSelector} from "../redux/formSlice";

export const useSubmit = (formName, submit: Function, schema) => {
  const form = useSelector(createFormSelector(formName));
  const dispatch = useDispatch();
  return useCallback(() => {
    schema.validate({
      ...form.toJS(),
    }).then((res) => {
      submit(res);
      dispatch(clearFormError());
    }).catch(({path = '', errors = ['']}) => {
      dispatch(changeFormError({
        name: path,
        value: errors[0]
      }));
    });
  }, [dispatch, form, schema, submit]);
};
