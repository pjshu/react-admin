// @flow
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  asyncDecSendCodeTime,
  selectResendTime,
} from "../../redux/userSlice";
import {Button, makeStyles} from "@material-ui/core";
import FORM from "../../contants/form.json";
import {useSubmit} from "../../hooks/Submit";
import {useRecPassFormRendCode, useSubmitRecPass} from '../../hooks/recoveryPass';
import {validateEmail, validateRecoveryPassword} from "../../helpers/validate";

const useStyles = makeStyles({
  button: {
    marginLeft: '25px',
    width: '125px',
    height: '45px'
  },
});

const Timing = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const resendTime = useSelector(selectResendTime);
  const onSubmit = useRecPassFormRendCode();
  const handleOnSubmit = useSubmit(FORM.recoveryPasswordSendCode, onSubmit, validateEmail);

  useEffect(() => {
    if (resendTime > 0) {
      dispatch(asyncDecSendCodeTime());
    }
  }, [dispatch, resendTime]);

  return (
    <Button
      color="primary"
      disabled={resendTime > 0}
      className={classes.button}
      onClick={handleOnSubmit}
    >
      {
        resendTime > 0 ? `重新发送:${resendTime}` : '发送验证码'
      }
    </Button>
  );
});

const Submit = React.memo(function Submit() {
  const classes = useStyles();
  const onSubmit = useSubmitRecPass();
  const handleOnSubmit = useSubmit(FORM.recoveryPassword, onSubmit, validateRecoveryPassword);
  return (
    <Button
      onClick={handleOnSubmit}
      className={classes.button}
    >
      提交
    </Button>
  );
});


export {Timing, Submit};
