import React from 'react';
import {ErrorMessage, Field} from "formik";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import {Grid} from "@material-ui/core";

const TextFieldWithError = ({name, label, ...other}) => (
  <Grid>
    <Field
      name={name}
      as={TextField}
      label={label}
      color="primary"
      fullWidth={true}
      {...other}
    />
    <ErrorMessage
      name={name}
      component={Alert}
      severity="error"/>
  </Grid>
);

export default TextFieldWithError;
