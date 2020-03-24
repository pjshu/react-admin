import React, {useEffect} from 'react';
import {Button, Container, Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextFieldWithError from "../../components/TextFieldWithError";
import {Form, Formik} from 'formik';
import {validateRecoveryPassword} from '../../helpers/validate';
import {
  asyncDecSendCodeTime,
  recoveryPassword,
  resetSendCodeTime,
  selectRecoveryPassword,
  sendRecPassCode,
  setIsSendCode
} from '../../redux/userSlice';
import {useDispatch, useSelector} from "react-redux";
import useStyles from './recoveryPassword.style';

function RecoveryPassword() {
  const formRef = React.useRef();
  const {resendTime, isSendCode, initial} = useSelector(selectRecoveryPassword);
  const dispatch = useDispatch();
  const classes = useStyles(isSendCode);


  useEffect(() => {
    if (resendTime > 0) {
      dispatch(asyncDecSendCodeTime());
    }
  }, [resendTime]);

  const onSubmit = (values) => {
    dispatch(recoveryPassword(values));
  };
  const handelSendCode = () => {
    const current = formRef.current;
    if (current.values.email && !current.errors.email) {
      dispatch(resetSendCodeTime());
      dispatch(setIsSendCode());
      dispatch(sendRecPassCode(current.values));
    }
  };

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container justify="center" alignItems={"center"} className={classes.container}>
        <Formik
          innerRef={formRef}
          initialValues={initial}
          onSubmit={onSubmit}
          validationSchema={validateRecoveryPassword}
        >
          {
            ({errors, values}) => (
              <Form>
                <Paper
                  className={classes.paper}
                  component={Grid}
                  container
                  justify='space-between'
                  alignItems={'center'}
                >
                  <Grid
                    container
                    alignItems={"center"}
                    justify={"flex-start"}>
                    <TextFieldWithError
                      className={classes.textField}
                      {...{name: 'email', label: '邮箱', variant: "outlined"}}
                    />

                    <Grid className={classes.btnWrapper}>
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
                    </Grid>
                  </Grid>

                  <Grid className={classes.validateCode}>
                    <Grid
                      container
                      alignItems={"center"}
                      justify={"flex-start"}
                    >
                      <TextFieldWithError
                        className={classes.textField}
                        {...{
                          name: 'code', label: '邮箱验证码', variant: "outlined"
                        }}/>
                      <Grid className={classes.btnWrapper}>
                        <Button
                          type={'submit'}
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          提交
                        </Button>
                      </Grid>
                    </Grid>
                    {/*添加显示密码按钮 https://material-ui.com/components/text-fields/*/}
                    <Grid
                      container
                      alignItems={"center"}
                      justify={"flex-start"}
                      className={classes.fullWidth}>
                      <TextFieldWithError
                        className={classes.fullWidth}
                        {...{name: 'password', label: '新密码', variant: "outlined"}}
                      />
                    </Grid>
                    <Grid
                      container
                      alignItems={"center"}
                      justify={"flex-start"}
                    >
                      <TextFieldWithError
                        sclassName={classes.fullWidth}
                        {...{
                          name: 'confirm_password', label: '确认密码', variant: "outlined"
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Form>
            )
          }
        </Formik>
      </Grid>
    </Container>
  );
}

export default RecoveryPassword;
