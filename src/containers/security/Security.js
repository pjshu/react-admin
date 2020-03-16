import React from 'react';
import {Container, Grid} from "@material-ui/core";
import ResetPassword from "./ResetPassword";
import ValidateEmail from './ResetEmail';

function Security({state}) {
  const {password, confirm_password, email} = state;
  return (
    <Container>
      <Grid container direction={"column"} spacing={5}>
        <Grid item>
          <ResetPassword {...{password, confirm_password}}/>
        </Grid>
        <Grid item>
          <ValidateEmail {...{email}}/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Security;
