import React from 'react';
import FORM from "../../contants/form.json";
import {useSubmit} from "../../hooks/Submit";
import {Button} from "@material-ui/core";
import {useSubmitRegister} from "../../hooks/register";
import {validateRegister} from "../../helpers/validate";

function Submit() {
  const onSubmit = useSubmitRegister();
  const handleOnSubmit = useSubmit(FORM.register, onSubmit, validateRegister);
  return (
    <Button
      onClick={handleOnSubmit}
      variant="contained"
      color="primary"
    >
      确认
    </Button>
  );
}

export default React.memo(Submit);
