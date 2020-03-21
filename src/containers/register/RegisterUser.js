import {Grid} from "@material-ui/core";
import React from "react";
import useStyles from './registerUser.styles';
import TextFieldWithError from "../../components/TextFieldWithError";

function RegisterUser() {
  const classes = useStyles();
  return (
    <Grid container style={{
      marginTop: '20px'
    }}>
      <Grid
        container
        justify="space-around"
        className={classes.name}>
        {
          [
            {name: 'user.nickname', label: '昵称', variant: "outlined"},
            {name: 'user.username', label: '用户名', variant: "outlined"}
          ].map(item => (<TextFieldWithError key={item.name} {...item}/>))
        }
      </Grid>

      <Grid container justify="space-around" className={classes.password}>
        {
          [
            {name: 'user.password', label: '密码', type: "password", variant: "outlined"},
            {name: 'user.confirm_password', label: '确认密码', type: "password", variant: "outlined"},
          ].map(item => (
            <TextFieldWithError key={item.name} {...item}/>
          ))
        }
      </Grid>
    </Grid>
  );
}

export default RegisterUser;
