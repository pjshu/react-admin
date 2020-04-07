import React, {useCallback, useEffect} from 'react';
import {Button, Grid} from "@material-ui/core";
import {
  asyncDecSendCodeTime,
  resetSendCodeTime,
  selectSecurity,
  sendRestEmailCode,
  setIsSendCode
} from '../../redux/userSlice';
import {useDispatch, useSelector} from "react-redux";
import useStyles from './resetEmail.style';
import {Field, SubmitBtn} from "../../components/Form";
import {areEqual} from "../../helpers/misc";

const ResetEmail = React.memo(function ResetEmail() {
  const {resendTime, isSendCode} = useSelector(selectSecurity);
  return <ContextResetEmail {...{resendTime, isSendCode}}/>;
}, areEqual);

function ContextResetEmail({resendTime, isSendCode}) {
  const dispatch = useDispatch();
  const classes = useStyles(isSendCode);
  //TODO 性能优化:每次计时器改变,都会重新渲染
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

    <Grid container direction={"column"} spacing={5}>
      <Grid item>
        <Field
          formName={'security'}
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
        direction={'column'}
        spacing={5}
        container
        item
        className={classes.validateCodeWrapper}
      >
        <Grid item>
          <Field
            formName={'security'}
            disabled={!isSendCode}
            name={'code'}
            label={'验证码'}
            variant="outlined"
            className={classes.textfield}
          />
        </Grid>
        <Grid item>
          <SubmitBtn
            className={classes.button}
            variant="contained"
            color="primary"
            formName={'security'}
          >
            提交
          </SubmitBtn>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ResetEmail;
