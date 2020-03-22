import React, {useEffect} from 'react';
import {Button, Container, Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import TextFieldWithError from "../../components/TextFieldWithError";
import {Form, Formik} from 'formik';
import {validateRecoveryPassword} from '../../helpers/validate';
import {
  resetSendCodeTime, setIsSendCode, selectRecoveryPassword, recoveryPassword,
  sendRecPassCode, asyncDecSendCodeTime
} from '../../redux/userSlice';
import {useSelector, useDispatch} from "react-redux";

const useStyles = makeStyles({
  container: {
    height: '100%'
  },
  paper: {
    width: 500,
    minHeight: 200,
    padding: 40
  },
});


function RecoveryPassword() {
  const formRef = React.useRef();
  const {resendTime, isSendCode, initial} = useSelector(selectRecoveryPassword);
  const dispatch = useDispatch();


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

  const classes = useStyles();
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
                      style={{width: '265px'}}
                      {...{
                        name: 'email', label: '邮箱', variant: "outlined"
                      }}/>

                    <Grid style={{marginBottom: '40px'}}>
                      <Button
                        style={{
                          marginLeft: '30px',
                          width: '125px',
                          height: '45px'
                        }}
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

                  <Grid
                    style={{
                      display: isSendCode ? '' : "none"
                    }}>
                    <Grid
                      container
                      alignItems={"center"}
                      justify={"flex-start"}
                    >
                      <TextFieldWithError
                        style={{width: '265px'}}
                        {...{
                          name: 'code', label: '邮箱验证码', variant: "outlined"
                        }}/>
                      <Grid
                        style={{
                          marginBottom: '40px'
                        }}>
                        <Button
                          type={'submit'}
                          style={{
                            marginLeft: '30px',
                            width: '125px',
                            height: '45px'
                          }}
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
                      style={{
                        width: '100%'
                        // display: isSendCode ? '' : "none"
                      }}>
                      <TextFieldWithError
                        style={{width: '100%'}}
                        {...{name: 'password', label: '新密码', variant: "outlined"}}
                      />
                    </Grid>
                    <Grid
                      container
                      alignItems={"center"}
                      justify={"flex-start"}
                      style={{
                        // display: isSendCode ? '' : "none"
                      }}>
                      <TextFieldWithError
                        style={{width: '100%'}}
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
