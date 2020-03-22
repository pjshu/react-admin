import React from 'react';
import {Field, useFormikContext} from "formik";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles({
  root: {
    marginBottom: '40px'
  },
  error: {
    height: '30px',
    position: 'fixed',
    background: '#fff'
  }
});

const TextFieldWithError = ({name, label, ...rest}) => {
  const {errors, touched} = useFormikContext();

  const error = !!errors[name] && !!touched[name];
  return (
    <Field
      as={TextField}
      name={name}
      label={label}
      color="primary"
      fullWidth={true}
      error={error}
      helperText={errors[name]}
      {...rest}
    />
  );
};
export default TextFieldWithError;
