import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import useStyles from "./recoveryPassword.style";
import {
  asyncDecSendCodeTime,
  selectValidateCode,
} from "../../redux/userSlice";
import {Grid} from "@material-ui/core";
import {Field, SubmitBtn} from "../../components/Form";
import {FORM} from "../../redux/formSlice";


export const HiddenField = React.memo(() => {
  const classes = useStyles();
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
        <Field
          name={'code'}
          label={"邮箱验证码"}
          formName={FORM.recoveryPassword}
          className={classes.textField}
        />
        <SubmitBtn
          formName={FORM.recoveryPassword}
          className={classes.button}
        >
          提交
        </SubmitBtn>
      </Grid>
      <Grid item className={classes.fullWidth}>
        <Field
          name={'password'}
          label={"新密码"}
          className={classes.textField}
          formName={FORM.recoveryPassword}
        />
      </Grid>
      <Grid item className={classes.fullWidth}>
        <Field
          name={'confirm_password'}
          label={"确认密码"}
          className={classes.textField}
          formName={FORM.recoveryPassword}
        />
      </Grid>
    </Grid>
  );
});


export const Timing = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector(selectValidateCode);
  const resendTime = data.get('resendTime')

  useEffect(() => {
    if (resendTime > 0) {
      dispatch(asyncDecSendCodeTime());
    }
  }, [dispatch, resendTime]);

  return (
    <SubmitBtn
      disabled={resendTime > 0}
      className={classes.button}
      formName={FORM.recoveryPasswordSendCode}
    >
      {
        resendTime > 0 ? `重新发送:${resendTime}` : '发送验证码'
      }
    </SubmitBtn>
  );
});
