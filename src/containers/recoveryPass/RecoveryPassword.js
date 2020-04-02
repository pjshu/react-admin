import React, {useCallback, useEffect, useMemo} from 'react';
import {Button, Container, Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {
  asyncDecSendCodeTime,
  changeFormError as _changeFormError,
  clearFormError as _clearFormError,
  resetSendCodeTime,
  selectRecoveryPassword,
  sendRecPassCode,
  recoveryPassword
} from '../../redux/userSlice';
import {useDispatch, useSelector} from "react-redux";
import useStyles from './recoveryPassword.style';
import {Field, SubmitBtn} from './Form';
import {validateEmail, validateRecoveryPassword} from "../../helpers/validate";

const clearFormError = (props) => _clearFormError({...props, form: 'recoveryPassword'});
const changeFormError = (props) => _changeFormError({...props, form: 'recoveryPassword'});

const RecoveryPassword = () => {
  const {isSendCode} = useSelector(selectRecoveryPassword);
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid
        className={classes.container}
        container
        justify="center"
        alignItems={"center"}
      >
        <Paper
          className={classes.paper}
          component={Grid}
          alignItems={'center'}
          container
          spacing={3}
        >
          <Grid
            item
            container
            direction={'row'}
            alignItems={"center"}
          >
            <Field name={'email'} label={"邮箱"}/>
            <Timing/>
          </Grid>
          {
            isSendCode ? <HiddenField/> : null
          }
        </Paper>
      </Grid>
    </Container>
  );
};

const HiddenField = React.memo(() => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {form} = useSelector(selectRecoveryPassword);

  const handleOnSubmit = useCallback(() => {
    validateRecoveryPassword.validate({
      ...form
    }).then((values) => {
      dispatch(clearFormError());
      dispatch(recoveryPassword(values));
    }).catch(({path, errors}) => {
      dispatch(changeFormError({name: path, value: errors[0]}));
    });
  }, [dispatch, form]);

  return (
    <Grid
      spacing={3}
      container
      item
    >
      <Grid
        item
        container
        direction={'row'}
        alignItems={"center"}
      >
        <Field name={'code'} label={"邮箱验证码"}/>
        <SubmitBtn handleOnSubmit={handleOnSubmit}>
          提交
        </SubmitBtn>
      </Grid>
      <Grid item className={classes.fullWidth}>
        <Field name={'password'} label={"新密码"}/>
      </Grid>
      <Grid item className={classes.fullWidth}>
        <Field name={'confirm_password'} label={"确认密码"}/>
      </Grid>
    </Grid>
  );
});


const Timing = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {resendTime, form, errors} = useSelector(selectRecoveryPassword);

  // TODO:BUG 什么都不输入直接点击
  const disabled = useMemo(() => {
    const value = errors['value'];
    return value !== '' || resendTime > 0;
  }, [errors, resendTime]);


  const handleOnSubmit = React.useCallback(() => {
    validateEmail.validate({
      email: form.email
    }).then((res) => {
      dispatch(clearFormError());
      dispatch(resetSendCodeTime());
      dispatch(sendRecPassCode(res));
    }).catch(({path, errors}) => {
      dispatch(changeFormError({name: path, value: errors[0]}));
    });
  }, [dispatch, form.email]);

  useEffect(() => {
    if (resendTime > 0) {
      dispatch(asyncDecSendCodeTime());
    }
  }, [dispatch, resendTime]);

  return (
    <SubmitBtn
      disabled={disabled}
      className={classes.button}
      handleOnSubmit={handleOnSubmit}
    >
      {
        resendTime > 0 ? `重新发送:${resendTime}` : '发送验证码'
      }
    </SubmitBtn>

  );
});

export default React.memo(RecoveryPassword);
