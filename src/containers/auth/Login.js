import React from 'react';
import {Container, Grid} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {object, string} from 'yup';
import Alert from '@material-ui/lab/Alert';
import api from "../../helpers/http";
import {toAdmin} from "../../history";

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%'
  },
  paper: {
    width: 500,
    height: 350,
    padding: 20
  },
  form: {
    width: 420,
  },
  password: {
    marginTop: '35px'
  },
  submit: {
    marginTop: '55px'
  },
  error: {
    background: '#fff',
    width: '387px',
    position: 'fixed'
  }
}));

function Login() {
  const classes = useStyles();
  const validationSchema = object({
    username: string()
      .max('30', '用户名不能超过30位')
      .required('请输入用户名'),
    password: string()
      .max('30', '密码不能超过30位')
      .required('请输入密码')
  });

  function onSubmit(values) {
    api.login(values).then(res => {
      if (res.status === 'success') {
        localStorage.setItem('identify', res.data.id);
        localStorage.setItem('Authorization', res.data.token);
        toAdmin();
      }
    });
  }

  function handleResetPassword(e) {

  }

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container justify="center" alignItems={"center"} className={classes.container}>
        <Paper
          className={classes.paper}
          component={Grid}
          direction="column"
          container
          alignItems="center"
          justify="center">
          <Formik
            initialValues={{username: '', password: ''}}
            onSubmit={(values) => onSubmit(values)}
            validationSchema={validationSchema}
          >
            <Form className={classes.form}>
              <Grid container direction="column">
                <Grid>
                  <Field
                    name="username"
                    as={TextField}
                    label="用户名"
                    color="primary"
                    fullWidth={true}
                  />
                  <ErrorMessage
                    className={classes.error}
                    name="username"
                    component={Alert}
                    severity="error"/>
                </Grid>

                <Grid className={classes.password}>
                  <Field
                    type="password"
                    name="password"
                    as={TextField}
                    label="密码"
                    color="primary"
                    fullWidth={true}
                  />
                  <ErrorMessage
                    className={classes.error}
                    name="password"
                    component={Alert}
                    severity="error"/>
                </Grid>
                <Button
                  className={classes.submit}
                  variant="outlined"
                  color="primary"
                  fullWidth={true}
                  type="submit"
                >
                  登录
                </Button>
                <Button
                  onClick={handleResetPassword}
                  color="primary">忘记密码</Button>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      </Grid>
    </Container>
  );

}

export default Login;
