import React from 'react';
import {Grid} from "@material-ui/core";
import useStyles from './registerEmail.style';
import {Field} from "../../components/Form";

function RegisterEmail() {
  const classes = useStyles();
  return (
    <Grid container direction={"column"}>
      <div className={classes.wrapper}>
        <Field
          formName={'security'}
          variant={"outlined"}
          name={'email'}
          label={'邮箱'}
        />
      </div>
    </Grid>
  );
}

export default React.memo(RegisterEmail);
