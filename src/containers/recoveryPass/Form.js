import React, {useMemo} from 'react';
import {
  changeFormField as _changeFormField,
  selectRecoveryPassword
} from "../../redux/userSlice";
import {useDispatch, useSelector} from "react-redux";
import useStyles from './recoveryPassword.style';
import {Button, TextField} from "@material-ui/core";

const changeFormField = (props) => _changeFormField({...props, form: 'recoveryPassword'});

//TODO: 计时时会重新渲染,TextField的问题
const Field = React.memo(({label, name, ...rest}) => {
  const {form, errors} = useSelector(selectRecoveryPassword);
  const dispatch = useDispatch();

  const handleFormChange = React.useCallback((e) => {
    const {name, value} = e.target;
    dispatch(changeFormField({name, value}));
  }, [dispatch]);

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

const areEqual = (prevProps, nextProps) => {
  return nextProps.value === prevProps.value && prevProps.error === nextProps.error;
};

const MyTextField = React.memo(({name, value, handleFormChange, label, error, ...rest}) => {
  const classes = useStyles();
  return (
    <TextField
      name={name}
      value={value}
      onChange={handleFormChange}
      className={classes.textField}
      label={label}
      color="primary"
      fullWidth={true}
      variant={"outlined"}
      error={error.isError}
      helperText={error.text}
      {...rest}
    />
  );
}, areEqual);

const SubmitBtn = React.memo(({children, handleOnSubmit, ...rest}) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleOnSubmit}
      className={classes.button}
      {...rest}
    >
      {children}
    </Button>
  );
});

export {Field, SubmitBtn};
