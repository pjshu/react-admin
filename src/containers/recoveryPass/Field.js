import React from "react";
import useStyles from "./recoveryPassword.style";
import {Grid} from "@material-ui/core";
import {Field} from "../../components/Form";
import FORM from "../../contants/form.json";
import {Submit} from './Submit';

export const HiddenField = React.memo(() => {
  const classes = useStyles();
  return (
    <Grid
      spacing={3}
      container
      item
    >
      <Grid
        item
        container
        direction={'row'}
        alignItems={"center"}
      >
        <Field
          name={'code'}
          label={"邮箱验证码"}
          formName={FORM.recoveryPassword}
          className={classes.textField}
        />
        <Submit/>
      </Grid>
      <Grid item className={classes.fullWidth}>
        <Field
          name={'password'}
          label={"新密码"}
          className={classes.textField}
          formName={FORM.recoveryPassword}
        />
      </Grid>
      <Grid item className={classes.fullWidth}>
        <Field
          name={'confirm_password'}
          label={"确认密码"}
          className={classes.textField}
          formName={FORM.recoveryPassword}
        />
      </Grid>
    </Grid>
  );
});

