import React, {useCallback} from 'react';
import {Container, Grid, Paper, Button} from "@material-ui/core";
import ResetPassword from "./ResetPassword";
import ResetEmail from './ResetEmail';
import useStyles from './security.style';
import {toRecoveryPass} from "../../history";

function Security() {
  const classes = useStyles();
  const handleOnClick = useCallback(() => {
    toRecoveryPass();
  }, []);
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
          <ResetEmail/>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            onClick={handleOnClick}
            variant="contained"
            color="primary"
          >
            忘记密码
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Security;
