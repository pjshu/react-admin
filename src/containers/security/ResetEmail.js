import React, {useCallback, useEffect} from 'react';
import {Button, Grid} from "@material-ui/core";
import {
  asyncDecSendCodeTime,
  resetSendCodeTime,
  sendRestEmailCode,
  selectIsSendCode,
  selectResendTime,
  setIsSendCode
} from '../../redux/userSlice';
import {useDispatch, useSelector} from "react-redux";
import useStyles from './resetEmail.style';
import {Field} from "../../components/Form";
import FORM from "../../contants/form.json";
import {ResetEmailBtn} from './Submit';

function ResetEmail() {
  const isSendCode = useSelector(selectIsSendCode);
  const resendTime = useSelector(selectResendTime);
  const dispatch = useDispatch();

  const classes = useStyles(isSendCode);

  useEffect(() => {
    if (resendTime > 0) {
      dispatch(asyncDecSendCodeTime());
    }
  }, [dispatch, resendTime]);

  const handleSendCode = useCallback(() => {
    dispatch(resetSendCodeTime());
    dispatch(setIsSendCode());
    dispatch(sendRestEmailCode());
    // if (values.email === email) {
    //   setFieldValue('email', '');
    // }
  }, [dispatch]);

  return (
    <Grid component={'form'} container direction={"column"} spacing={5}>
      <Grid item>
        <Field
          autoComplete={'on'}
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
          <ResetEmailBtn/>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ResetEmail;
