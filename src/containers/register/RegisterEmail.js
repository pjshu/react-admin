import React from 'react';
import TextFieldWithError from "../../components/TextFieldWithError";
import {Grid} from "@material-ui/core";
import useStyles from './registerEmail.style';

function RegisterEmail() {
  const classes = useStyles();
  return (
    <Grid container direction={"column"}>
      <div className={classes.wrapper}>
        <TextFieldWithError
          variant={"outlined"}
          name={'email'}
          label={'邮箱'}
        />
      </div>
    </Grid>
  );
}

export default RegisterEmail;
