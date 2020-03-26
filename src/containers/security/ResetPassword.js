import React from 'react';
import {Field, Form, Formik, useFormikContext} from "formik";
import {Button, FormHelperText, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword, selectSecurity} from "../../redux/userSlice";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import {validateResetPassword} from '../../helpers/validate';
import useStyles from './resetPassword.style';

const PasswordField = ({name, label, ...rest}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const {errors, touched} = useFormikContext();
  const error = !!errors[name] && !!touched[name];
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <FormControl variant="outlined" {...rest}>
      <InputLabel error={error} htmlFor="password">{label}</InputLabel>
      <Field
        as={OutlinedInput}
        type={showPassword ? 'text' : 'password'}
        name={name}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              // onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility/> : <VisibilityOff/>}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70}
      />
      {
        error ?
          <FormHelperText className={classes.formHelperText}>{errors[name]}</FormHelperText>
          : null
      }
    </FormControl>
  );
};

function ResetPassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {initial: {resetPasswordInit}} = useSelector(selectSecurity);
  const onSubmit = (values) => {
    dispatch(resetPassword(values));
  };


  return (
    <Formik
      initialValues={resetPasswordInit}
      onSubmit={onSubmit}
      validationSchema={validateResetPassword}
    >
      <Form>
        <Grid container direction={"column"} spacing={5}>
          {
            [
              {'name': 'old_password', label: '旧密码'},
              {'name': 'password', label: '新密码'},
              {'name': 'confirm_password', label: '确认密码'},
            ].map(value => (
              <Grid item key={value.name}>
                <PasswordField
                  className={classes.textfield}
                  name={value.name}
                  label={value.label}
                />
              </Grid>
            ))
          }
          <Grid item>
            <Button
              type={'submit'}
              className={classes.passwordField}
              variant="contained"
              color="primary"
            >
              修改密码
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}

export default ResetPassword;
