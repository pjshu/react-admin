// @flow
import React from 'react';
import FORM from "../../contants/form.json";
import {Button, makeStyles} from "@material-ui/core";
import {useSubmit} from "../../hooks/Submit";
import {useResetPassword, useResetEmail} from '../../hooks/security';
import {validateResetEmail, validateResetPassword} from "../../helpers/validate";

const useStyle = makeStyles({
  passwordField: {
    width: '125px',
    height: '45px'
  },
  button: {
    width: '125px',
    height: '45px'
  },
});


const Submit = React.memo(function Submit() {
  const classes = useStyle();
  const onSubmit = useResetPassword();
  const handleOnSubmit = useSubmit(FORM.resetPassword, onSubmit, validateResetPassword);

  return (
    <Button
      className={classes.passwordField}
      variant="contained"
      color="primary"
      onClick={handleOnSubmit}
    >
      修改密码
    </Button>
  );
});

const ResetEmailBtn = React.memo(function () {
  const classes = useStyle();
  const onSubmit = useResetEmail();
  const handleOnSubmit = useSubmit(FORM.resetEmail, onSubmit, validateResetEmail);
  return (
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      onClick={handleOnSubmit}
    >
      提交
    </Button>
  );
});

export {ResetEmailBtn, Submit};
