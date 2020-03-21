import React, {useEffect, useRef} from 'react';
import {Form, Formik} from "formik";
import {Button, Grid} from "@material-ui/core";
import {
  asyncDecSendCodeTime, selectSecurity, resetSendCodeTime, setIsSendCode,
  sendRestEmailCode, resetEmail
} from '../../redux/userSlice';
import {useDispatch, useSelector} from "react-redux";
import TextFieldWithError from '../../components/TextFieldWithError';
import {makeStyles} from "@material-ui/core/styles";
import {validateResetEmail} from '../../helpers/validate'
const useStyles = makeStyles((theme) => ({
  textfield: {
    width: '350px',
    [theme.breakpoints.up('md')]: {
      width: '550px',
    },
  }
}));

function ResetEmail({email}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {initial: {resetEmailInit}, resendTime, isSendCode} = useSelector(selectSecurity);
  const formikRef = useRef();
  //TODO 性能优化:每次计时器改变,都会重新渲染
  useEffect(() => {
    if (resendTime > 0) {
      dispatch(asyncDecSendCodeTime());
    }
  }, [resendTime]);

  const onSubmit = (values) => {
    dispatch(resetEmail(values));
  };
  const handleSendCode = () => {
    dispatch(resetSendCodeTime());
    dispatch(setIsSendCode());
    const {setFieldValue, values} = formikRef.current;
    if (values.email === email) {
      setFieldValue('email', '');
    }
    dispatch(sendRestEmailCode());
  };


  return (
    <Formik
      innerRef={formikRef}
      initialValues={resetEmailInit}
      onSubmit={onSubmit}
      validationSchema={validateResetEmail}
    >
      {
        ({errors, touched}) => (
          <Form>
            <Grid container direction={"column"} spacing={5}>
              <Grid item>
                <TextFieldWithError
                  errors={errors}
                  touched={touched}
                  disabled={!isSendCode}
                  name={'email'}
                  label={'邮箱'}
                  variant="outlined"
                  className={classes.textfield}
                />
              </Grid>
              <Grid item>
                <Button
                  style={{
                    width: '125px',
                    height: '45px'
                  }}
                  disabled={resendTime > 0}
                  variant="contained"
                  color="primary"
                  onClick={handleSendCode}
                >
                  {
                    ` ${resendTime > 0 ? `重新发送(${resendTime})` : `${isSendCode ? '重新发送' : '修改邮箱'}`}`
                  }
                </Button>
              </Grid>

              <Grid
                style={{
                  marginTop: '50px',
                  display: isSendCode ? '' : 'none'
                }}
              >
                <TextFieldWithError
                  errors={errors}
                  touched={touched}
                  disabled={!isSendCode}
                  name={'code'}
                  label={'验证码'}
                  variant="outlined"
                  className={classes.textfield}
                />
                <Grid>
                  <Button
                    style={{
                      width: '125px',
                      height: '45px'
                    }}
                    variant="contained"
                    color="primary"
                    type={'submit'}
                  >
                    提交
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )
      }
    </Formik>
  );
}

export default ResetEmail;
