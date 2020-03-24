import React, {useEffect, useRef} from 'react';
import {Form, Formik} from "formik";
import {Button, Grid} from "@material-ui/core";
import {
  asyncDecSendCodeTime,
  resetEmail,
  resetSendCodeTime,
  selectSecurity,
  sendRestEmailCode,
  setIsSendCode
} from '../../redux/userSlice';
import {useDispatch, useSelector} from "react-redux";
import TextFieldWithError from '../../components/TextFieldWithError';
import {validateResetEmail} from '../../helpers/validate';
import useStyles from './resetEmail.style';


function ResetEmail({email}) {
  const dispatch = useDispatch();
  const {initial: {resetEmailInit}, resendTime, isSendCode} = useSelector(selectSecurity);
  const classes = useStyles(isSendCode);
  const formRef = useRef();
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
    const {setFieldValue, values} = formRef.current;
    if (values.email === email) {
      setFieldValue('email', '');
    }
    dispatch(sendRestEmailCode());
  };


  return (
    <Formik
      innerRef={formRef}
      initialValues={resetEmailInit}
      onSubmit={onSubmit}
      validationSchema={validateResetEmail}
    >
      <Form>
        <Grid container direction={"column"} spacing={5}>
          <Grid item>
            <TextFieldWithError
              disabled={!isSendCode}
              name={'email'}
              label={'邮箱'}
              variant="outlined"
              className={classes.textfield}
            />
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
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
            className={classes.validateCodeWrapper}
          >
            <TextFieldWithError
              disabled={!isSendCode}
              name={'code'}
              label={'验证码'}
              variant="outlined"
              className={classes.textfield}
            />
            <Grid>
              <Button
                className={classes.button}
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
    </Formik>
  );
}

export default ResetEmail;
