// @flow

import React from 'react';
import FORM from "../../contants/form.json";
import {Button, makeStyles} from "@material-ui/core";
import {useSubmit} from "../../hooks/Submit";
import {useSubmitUserInfo} from '../../hooks/user';
import {validateUserInfo} from "../../helpers/validate";

const useStyles = makeStyles({
  button: {
    marginTop: 40
  }
});


function Submit() {
  const classes = useStyles();
  const onSubmit = useSubmitUserInfo();
  const handleOnSubmit = useSubmit(FORM.userInfo, onSubmit, validateUserInfo);
  return (
    <Button
      className={classes.button}
      type={"submit"}
      variant="contained"
      color="primary"
      onClick={handleOnSubmit}
    >
      提交
    </Button>
  );
}

export default Submit;
