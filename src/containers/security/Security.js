import React from 'react';
import {Container, Grid, Paper} from "@material-ui/core";
import ResetPassword from "./ResetPassword";
import ValidateEmail from './ResetEmail';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: '90%'
  }
});

function Security() {
  const classes = useStyles();
  return (
    <Container
      className={classes.root}
      maxWidth={false}
      component={Paper}>
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
