import React, {useCallback} from 'react';
import {Container, Grid} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import useStyles from './login.style';
import {Link} from 'react-router-dom';
import router from '../../contants/router';
import {login, selectLogin} from '../../redux/userSlice';
import {useDispatch, useSelector} from "react-redux";
import {Field, SubmitBtn} from "./Form";

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmit = useCallback((values) => {
    dispatch(login(values));
  }, [dispatch]);

  const handleOnSubmit = useCallback(() =>{

  },[]);

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container justify="center" alignItems={"center"} className={classes.container}>

        <Grid
          className={classes.paper}
          component={Paper}
          direction="column"
          container
          alignItems="center"
          justify="center"
          spacing={4}
        >
          <Grid item className={classes.fullWidth}>
            <Grid container direction="column" spacing={2}>
              {
                [
                  {name: "username", label: "用户名"},
                  {name: "password", label: "密码", type: "password"}
                ].map(item => (
                  <Grid item key={item.name}>
                    <Field {...item}/>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
          <Grid item className={classes.fullWidth}>
            <Grid container direction={'column'}>
              <Grid item>
                <SubmitBtn
                  variant="outlined"
                  fullWidth={true}
                >
                  登陆
                </SubmitBtn>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  fullWidth={true}
                  component={Link}
                  to={router.RECOVER_PASSWORD}
                >
                  忘记密码
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );

}

export default Login;
