// @flow

import React from 'react';
import FORM from "../../contants/form.json";
import {Button} from "@material-ui/core";
import {useSubmit} from "../../hooks/Submit";
import {useSubmitTagsForm} from '../../hooks/tags';
import {validateTag} from "../../helpers/validate";

function Submit(props) {
  const {action, addMultiple, updateHandler} = props;
  const onSubmit = useSubmitTagsForm({
    addMultiple,
    updateHandler
  });
  const handleOnSubmit = useSubmit(FORM.tags, onSubmit, validateTag);

  return (
    <Button onClick={handleOnSubmit} color="primary">
      {
        action === 'add' ? '添加' : '更新'
      }
    </Button>
  );
}

export default React.memo(Submit);
