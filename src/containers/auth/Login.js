import React from 'react';
import {Container, Grid} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {object, string} from 'yup';
import Alert from '@material-ui/lab/Alert';
import {login} from "../../helpers/http";
import {withRouter} from 'react-router-dom'
import router from '../../contants/router'

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

function Login({history}) {
  const classes = useStyles();
  const validationSchema = object({
    email: string()
      .email("邮箱格式错误")
      .required('请输入邮箱'),
    password: string()
      .max('30', '密码不能超过30位')
      .required('请输入密码')
  });

  function onSubmit(values) {
    login(values).then(res => {
      if(res.data.status === 'success'){
        history.push(router.ADMIN)
      }
    }).catch(error => {
        console.log(error);
      }
    );
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
            initialValues={{email: '', password: ''}}
            onSubmit={(values) => onSubmit(values)}
            validationSchema={validationSchema}
          >
            <Form className={classes.form}>
              <Grid container direction="column">
                <Grid>
                  <Field
                    name="email"
                    as={TextField}
                    label="邮箱"
                    color="primary"
                    fullWidth={true}
                  />
                  <ErrorMessage
                    className={classes.error}
                    name="email"
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

export default withRouter(Login);
