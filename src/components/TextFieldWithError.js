import React from 'react';
import {ErrorMessage, Field} from "formik";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import {Grid, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
  error: {
    height: 30,
    position: 'fixed',
    background: '#fff'
  }
});

const TextFieldWithError = ({name, label, ...other}) => {
  const classes = useStyles();
  return (
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
        className={classes.error}
        name={name}
        component={Alert}
        severity="error"/>
    </Grid>
  );
};

export default TextFieldWithError;
