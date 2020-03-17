import React, {useEffect, createRef} from 'react';
import {Button, Container, Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import TextFieldWithError from "../../components/TextFieldWithError";
import {Form, Formik} from 'formik';
import {object, string} from "yup";
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
    height: 350,
    padding: 40
  },
});


function RecoveryPassword() {
  const formikRef = createRef();
  const {resendTime, isSendCode, initial} = useSelector(selectRecoveryPassword);
  const dispatch = useDispatch();
  const validationSchema = object({
    email: string()
      .email('请输入正确的邮箱格式')
      .required('请输入邮箱'),
    // TODO 验证码位数
    code: string()
      .required('请输入验证码')
  });

  useEffect(() => {
    if (resendTime > 0) {
      dispatch(asyncDecSendCodeTime());
    }
  }, [resendTime]);

  const onSubmit = (values) => {
    dispatch(recoveryPassword(values));
  };
  const handelSendCode = () => {
    const current = formikRef.current;
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
          innerRef={formikRef}
          initialValues={initial}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
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
                    justify={"space-around"}>
                    <TextFieldWithError
                      style={{
                        width: '250px'
                      }}
                      {...{
                        name: 'email', label: '邮箱', variant: "outlined"
                      }}/>

                    <Grid style={{marginBottom: '40px'}}>
                      <Button
                        style={{
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
                    container
                    alignItems={"center"}
                    justify={"space-around"}
                    style={{
                      display: isSendCode ? '' : "none"
                    }}>
                    <TextFieldWithError
                      style={{
                        width: '250px'
                      }}
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
