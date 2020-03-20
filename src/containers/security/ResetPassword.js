import React from 'react';
import {Form, Formik, Field} from "formik";
import {object, ref, string} from 'yup';
import TextFieldWithError from "../../components/TextFieldWithError";
import {Button, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {selectSecurity, resetPassword} from "../../redux/userSlice";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import {makeStyles} from "@material-ui/core/styles";
import {FormHelperText} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: '350px',
    [theme.breakpoints.up('md')]: {
      width: '550px',
    },
  }
}));

const PasswordField = ({touched, errors, name, label, ...rest}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const error = !!errors[name] && !!touched[name];
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <FormControl variant="outlined" {...rest}>
      <InputLabel error={error} htmlFor="password">{label}</InputLabel>
      <Field
        as={OutlinedInput}
        id="password"
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
          <FormHelperText style={{color: 'red'}}>{errors[name]}</FormHelperText> : null
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
  const validationSchema = object({
    old_password: string()
      .max('30', '密码不能超过30位')
      .required('请输入旧密码'),
    password: string()
      .max('30', '密码不能超过30位')
      .required('请输入密码'),
    confirm_password: string()
      .oneOf([ref('password'), null], "密码不匹配")
      .max('30', '密码不能超过30位')
      .required('请确认密码'),
  });

  return (
    <Formik
      initialValues={resetPasswordInit}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {
        ({errors, touched}) => (
          <Form>
            <Grid container direction={"column"} spacing={5}>
              <Grid item>
                <PasswordField
                  className={classes.textfield}
                  name={'old_password'}
                  label={'旧密码'}
                  errors={errors}
                  touched={touched}/>
              </Grid>
              <Grid item>
                <PasswordField
                  className={classes.textfield}
                  name={'password'}
                  label={'新密码'}
                  errors={errors}
                  touched={touched}
                />
              </Grid>
              <Grid item>
                <PasswordField
                  className={classes.textfield}
                  name={'confirm_password'}
                  label={'确认密码'} errors={errors}
                  touched={touched}
                />
              </Grid>
              <Grid item>
                <Button
                  type={'submit'}
                  style={{
                    width: '125px',
                    height: '45px'
                  }}
                  variant="contained"
                  color="primary"
                >
                  修改密码
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }
    </Formik>
  );
}

export default ResetPassword;
