import React, {useCallback, useMemo} from 'react';
import {selects, changeFormField as _changeFormField} from "../redux";

import {useDispatch, useSelector} from "react-redux";

import {Button, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import router from "../contants/router";

const fieldAreEqual = (prev, next) => {
  return prev.getValue === next.getValue;
};

//TODO: 计时时会重新渲染,TextField的问题
const Field = React.memo(function Field(props) {
  const {as, label, name, formName, getValue, children, ...rest} = props;
  const {form, errors} = useSelector(selects[formName]);
  const dispatch = useDispatch();

  const changeFormField = React.useCallback((props) => _changeFormField[formName](props), [formName]);

  const handleFormChange = useCallback((e, other) => {
    let value;
    if (getValue) {
      value = getValue(e, other);
    } else {
      value = e.target.value;
    }
    dispatch(changeFormField({name, value}));
  }, [changeFormField, dispatch, getValue, name]);

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
    <MemoTextField {...{as, name, value, handleFormChange, label, error, children, ...rest}}/>
  );
}, fieldAreEqual);

const textFieldAreEqual = (prev, next) => {
  return next.value === prev.value && prev.error === next.error && next.children === prev.children;
};

const MemoTextField = React.memo(function MyTextField(props) {
  const {as, name, value, handleFormChange, label, error, children, ...rest} = props;
  if (as) {
    return React.createElement(
      as,
      {value, onChange: handleFormChange, label, ...rest},
      children
    );
  }
  return (
    <TextField
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

const SubmitBtn = React.memo(function SubmitBtn({children, handleOnSubmit, ...rest}) {
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

const CommonBtn = React.memo(function CommonBtn({children, ...props}) {
  return (
    <Button
      {...props}
    >
      {children}
    </Button>
  );
});
export {Field, SubmitBtn, CommonBtn};
