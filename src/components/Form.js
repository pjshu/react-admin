import React, {useCallback, useMemo} from 'react';
import {
  changeFormField as _changeFormField,
  selects
} from "../redux/userSlice";

import {useDispatch, useSelector} from "react-redux";

import {Button, TextField} from "@material-ui/core";


//TODO: 计时时会重新渲染,TextField的问题
const Field = React.memo(({label, name, formName, ...rest}) => {
  const {form, errors} = useSelector(selects[formName]);
  const dispatch = useDispatch();

  const changeFormField = useCallback((props) => _changeFormField({...props, form: formName}), [formName]);

  const handleFormChange = React.useCallback((e) => {
    const {name, value} = e.target;
    dispatch(changeFormField({name, value}));
  }, [changeFormField, dispatch]);

  const value = useMemo(() => {
    return form[name];
  }, [form, name]);

  const error = useMemo(() => {
    const field = errors['name'];
    const value = errors['value'];
    return {
      text: value,
      isError: field === name
    };
  }, [errors, name]);

  return (
    <MyTextField {...{name, value, handleFormChange, label, error, ...rest}}/>
  );
});

const textFieldAreEqual = (prevProps, nextProps) => {
  return nextProps.value === prevProps.value && prevProps.error === nextProps.error;
};

const MyTextField = React.memo(({name, value, handleFormChange, label, error, ...rest}) => {
  return (
    <TextField
      name={name}
      value={value}
      onChange={handleFormChange}
      label={label}
      color="primary"
      fullWidth={true}
      variant={"outlined"}
      error={error.isError}
      helperText={error.text}
      {...rest}
    />
  );
}, textFieldAreEqual);

const SubmitBtn = React.memo(({children, handleOnSubmit, ...rest}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleOnSubmit}
      {...rest}
    >
      {children}
    </Button>
  );
});

export {Field, SubmitBtn};
