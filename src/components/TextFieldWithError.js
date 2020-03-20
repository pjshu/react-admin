import React from 'react';
import {ErrorMessage, Field} from "formik";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import {Grid, makeStyles} from "@material-ui/core";

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

const TextFieldWithError = ({touched, errors, name, label, ...rest}) => {
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

// const TextFieldWithError = ({name, label, style, ...other}) => {
//   const classes = useStyles();
//   return (
//     <Grid style={style} className={classes.root}>
//       <Field
//         name={name}
//         as={TextField}
//         label={label}
//         color="primary"
//         fullWidth={true}
//         {...other}
//       />
//       <ErrorMessage
//         className={classes.error}
//         name={name}
//         component={Alert}
//         severity="error"/>
//     </Grid>
//   );
// };

