import React from 'react';
import {Container, Paper, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minHeight: '90%'
  }
});

function Index() {
  const classes = useStyles();
  return (
    <Container
      className={classes.root}
      maxWidth={false}
      component={Paper}>

    </Container>
  );
}

export default Index;
