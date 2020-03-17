import React from 'react';
import {Container, Grid} from "@material-ui/core";
import ResetPassword from "./ResetPassword";
import ValidateEmail from './ResetEmail';


function Security() {
  return (
    <Container>
      <Grid container direction={"column"} spacing={5}>
        <Grid item>
          <ResetPassword/>
        </Grid>
        <Grid item>
          <ValidateEmail/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Security;
