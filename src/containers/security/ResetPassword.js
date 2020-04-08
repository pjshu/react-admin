import React, {useCallback} from 'react';
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
import {Field, SubmitBtn} from "../../components/Form";
import {FORM} from "../../redux";

// const EyeIcon = React.memo(function EyeIcon({handleClickShowPassword}) {
//   return (
//     <InputAdornment position="end" key={'password'}>
//       <IconButton
//         aria-label="toggle password visibility"
//         onClick={handleClickShowPassword}
//         // onMouseDown={handleMouseDownPassword}
//         edge="end"
//       >
//         {showPassword ? <Visibility/> : <VisibilityOff/>}
//       </IconButton>
//     </InputAdornment>
//   );
// });
//
// //TODO

// const PasswordField = React.memo(({name, label, ...rest}) => {
//   const classes = useStyles();
//   const [showPassword, setShowPassword] = React.useState(false);
//   // const error = !!errors[name] && !!touched[name];
//
//   const handleClickShowPassword = useCallback(() => {
//     setShowPassword((showPassword) => !showPassword);
//   }, []);
//
//   return (
//     <FormControl variant="outlined" {...rest}>
//       <InputLabel
//         error={error}
//         htmlFor="password">{label}</InputLabel>
//       <OutlinedInput
//         formName={'security'}
//         type={showPassword ? 'text' : 'password'}
//         name={name}
//         endAdornment={<EyeIcon {...{handleClickShowPassword}}/>}
//         labelWidth={70}
//       />
//       {
//         error ?
//           <FormHelperText className={classes.formHelperText}>{errors[name]}</FormHelperText>
//           : null
//       }
//     </FormControl>
//   );
// });

function ResetPassword() {
  const classes = useStyles();
  return (
    <Grid container direction={"column"} spacing={5}>
      {
        [
          {'name': 'old_password', label: '旧密码'},
          {'name': 'password', label: '新密码'},
          {'name': 'confirm_password', label: '确认密码'},
        ].map(value => (
          <Grid item key={value.name}>
            <Field
              formName={FORM.resetPassword}
              className={classes.textfield}
              name={value.name}
              label={value.label}
            />
          </Grid>
        ))
      }
      <Grid item>
        <SubmitBtn
          formName={FORM.resetPassword}
          className={classes.passwordField}
          variant="contained"
          color="primary"
        >
          修改密码
        </SubmitBtn>
      </Grid>
    </Grid>
  );
}

export default React.memo(ResetPassword);
