import React, {useCallback, useEffect} from 'react';
import {Button, Container, Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextFieldWithError from "../../components/TextFieldWithError";
import {Form, Formik, useFormikContext} from 'formik';
import {validateRecoveryPassword} from '../../helpers/validate';
import {
  asyncDecSendCodeTime,
  recoveryPassword,
  resetSendCodeTime,
  selectRecoveryPassword,
  sendRecPassCode
} from '../../redux/userSlice';
import {useDispatch, useSelector} from "react-redux";
import useStyles from './recoveryPassword.style';

function RecoveryPassword() {
  const formRef = React.useRef();
  const {isSendCode, initial} = useSelector(selectRecoveryPassword);
  const dispatch = useDispatch();
  const classes = useStyles(isSendCode);

  const onSubmit = useCallback((values) => {
    dispatch(recoveryPassword(values));
  }, [dispatch]);

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container justify="center" alignItems={"center"} className={classes.container}>
        <Formik
          innerRef={formRef}
          initialValues={initial}
          onSubmit={onSubmit}
          validationSchema={validateRecoveryPassword}
        >
          <Form>
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
                <TextFieldWithError
                  className={classes.textField}
                  name={'email'}
                  label={'邮箱'}
                  variant={"outlined"}
                />
                <Timing/>
              </Grid>

              <Grid
                spacing={3}
                container
                item
                className={classes.validateCode}
              >
                <Grid
                  item
                  container
                  direction={'row'}
                  alignItems={"center"}
                >
                  <TextFieldWithError
                    className={classes.textField}
                    name={'code'}
                    label={'邮箱验证码'}
                    variant={"outlined"}
                  />
                  <Button
                    type={'submit'}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    提交
                  </Button>
                </Grid>
                {/*添加显示密码按钮 https://material-ui.com/components/text-fields/*/}
                <Grid item className={classes.fullWidth}>
                  <TextFieldWithError
                    name={'password'}
                    label={'新密码'}
                    variant={"outlined"}
                  />
                </Grid>
                <Grid item className={classes.fullWidth}>
                  <TextFieldWithError
                    name={'confirm_password'}
                    label={'确认密码'}
                    variant={"outlined"}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Form>
        </Formik>
      </Grid>
    </Container>
  );
}

const Timing = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {resendTime} = useSelector(selectRecoveryPassword);
  const {values, errors} = useFormikContext();

  useEffect(() => {
    if (resendTime > 0) {
      dispatch(asyncDecSendCodeTime());
    }
  }, [dispatch, resendTime]);

  const handelSendCode = useCallback(() => {
    if (values.email && !errors.email) {
      dispatch(resetSendCodeTime());
      dispatch(sendRecPassCode(values));
    }
  }, [dispatch, errors.email, values]);

  return (
    <Button
      disabled={resendTime > 0 || !!errors.email || !values.email}
      variant="contained"
      color="primary"
      onClick={handelSendCode}
      className={classes.button}
    >
      {
        resendTime > 0 ? `重新发送:${resendTime}` : '发送验证码'
      }
    </Button>
  );
});
export default RecoveryPassword;
