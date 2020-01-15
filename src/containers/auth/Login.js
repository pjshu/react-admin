import React from 'react';
import {Container, Grid} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Field, Form, Formik} from 'formik';
import {object, string} from 'yup';


const useStyles = makeStyles(theme => ({
  paper: {
    width: '500px',
    height: '300px',
    padding: '20px'
  },
  form: {
    width: "90%",
  }
}));

function Login(props) {
  const classes = useStyles();
  const validationSchema = object({
    email: string()
      .email("邮箱格式错误")
      .required('请输入用户名或邮箱'),
    password: string()
      .max('30', '密码不能超过30位')
      .required('请输入密码')
  });

  function onSubmit(values) {
    console.log(values);
  }


  return (
    <Container maxWidth="sm" className={classes.root}>
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
          {
            ({errors, touched}) => (
              <Form className={classes.form}>
                <Grid container direction="column">
                  <Field
                    name="email"
                    as={TextField}
                    label="邮箱"
                    color="primary"
                    fullWidth={true}
                    error={!!(errors.email && touched.email)}
                  />
                  <Field
                    type="password"
                    name="password"
                    as={TextField}
                    label="密码"
                    color="primary"
                    fullWidth={true}
                    error={!!(errors.password && touched.password)}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth={true}
                    type="submit"
                  >
                    登录
                  </Button>
                  <Button color="primary">忘记密码</Button>
                </Grid>
              </Form>
            )
          }

        </Formik>
      </Paper>
    </Container>
  );

}

export default Login;
