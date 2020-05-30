import React from 'react';
import {Button} from "@material-ui/core";
import {useSubmit} from "../../hooks/Submit";
import FORM from "../../contants/form.json";
import {useSubmitLogin} from '../../hooks/login';
import {validateLogin} from "../../helpers/validate";

function SubmitButton() {
  const submit = useSubmitLogin();
  const handleOnSubmit = useSubmit(FORM.login, submit, validateLogin, validateLogin);
  return (
    <div>
      <Button
        color="primary"
        onClick={handleOnSubmit}
        variant="outlined"
        fullWidth={true}
      >
        登录
      </Button>
    </div>
  );
}


export default React.memo(SubmitButton);
