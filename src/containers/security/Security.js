import React from 'react';
import {Container} from "@material-ui/core";
import ResetPassword from "./ResetPassword";
import ValidateEmail from './ValidateEmail';

function Security() {
  return (
    <Container>
      <ResetPassword/>
      <ValidateEmail {...{email_is_validate: false}}/>
    </Container>
  );
}

export default Security;
