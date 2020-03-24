import React from 'react';
import {CircularProgress, Grid} from "@material-ui/core";
import useStyles from './loading.style';

function Loading() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} justify={"center"} alignItems={"center"}>
      <CircularProgress/>
    </Grid>
  );
}

export default Loading;
