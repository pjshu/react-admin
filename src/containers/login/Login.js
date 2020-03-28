import React, {useCallback} from 'react';
import {Container, Grid} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Form, Formik} from 'formik';
import useStyles from './login.style';
import TextFieldWithError from "../../components/TextFieldWithError";
import {Link} from 'react-router-dom';
import router from '../../contants/router';
import {login, selectLogin} from '../../redux/userSlice';
import {useDispatch, useSelector} from "react-redux";
import {validateLogin} from '../../helpers/validate';


function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {initial} = useSelector(selectLogin);

  const onSubmit = useCallback((values) => {
    dispatch(login(values));
  }, [dispatch]);

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container justify="center" alignItems={"center"} className={classes.container}>
        <Formik
          initialValues={initial}
          onSubmit={onSubmit}
          validationSchema={validateLogin}
        >
          <Form>
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
                      {name: "username", label: "用户名", variant: "outlined"},
                      {name: "password", label: "密码", type: "password", variant: "outlined"}
                    ].map(item => (
                      <Grid item key={item.name}>
                        <TextFieldWithError {...{...item}}/>
                      </Grid>
                    ))
                  }
                </Grid>
              </Grid>
              <Grid item className={classes.fullWidth}>
                <Grid container direction={'column'}>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth={true}
                      type="submit"
                    >
                      登录
                    </Button>
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
          </Form>
        </Formik>
      </Grid>
    </Container>
  );

}

export default Login;
