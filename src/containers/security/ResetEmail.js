import React, {useCallback, useEffect} from 'react';
import {Button, Grid} from "@material-ui/core";
import {
  resetSendCodeTime,
  useSendRestEmailCode,
  selectValidateCode,
  setIsSendCode, useAsyncDecSendCodeTime
} from '../../redux/userSlice';
import {useDispatch, useSelector} from "react-redux";
import useStyles from './resetEmail.style';
import {Field, SubmitBtn} from "../../components/Form";
import {FORM} from "../../redux/formSlice";

function ResetEmail() {
  const {isSendCode, resendTime} = useSelector(selectValidateCode);
  const dispatch = useDispatch();
  const classes = useStyles(isSendCode);
  const asyncDecSendCodeTime = useAsyncDecSendCodeTime();
  const sendRestEmailCode = useSendRestEmailCode();
  useEffect(() => {
    if (resendTime > 0) {
      asyncDecSendCodeTime();
    }
  }, [asyncDecSendCodeTime, resendTime]);

  const handleSendCode = useCallback(() => {
    dispatch(resetSendCodeTime());
    dispatch(setIsSendCode());
    sendRestEmailCode();
    // if (values.email === email) {
    //   setFieldValue('email', '');
    // }
  }, [dispatch]);

  return (

    <Grid container direction={"column"} spacing={5}>
      <Grid item>
        <Field
          formName={FORM.resetEmail}
          disabled={!isSendCode}
          name={'email'}
          label={'邮箱'}
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
        direction={'column'}
        spacing={5}
        container
        item
        className={classes.validateCodeWrapper}
      >
        <Grid item>
          <Field
            formName={FORM.resetEmail}
            disabled={!isSendCode}
            name={'code'}
            label={'验证码'}
            className={classes.textfield}
          />
        </Grid>
        <Grid item>
          <SubmitBtn
            className={classes.button}
            variant="contained"
            color="primary"
            formName={FORM.resetEmail}
          >
            提交
          </SubmitBtn>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ResetEmail;
