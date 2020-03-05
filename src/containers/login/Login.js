import React from 'react';
import {Container, Grid} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Form, Formik} from 'formik';
import {object, string} from 'yup';
import api from "../../helpers/http";
import {toAdmin} from "../../history";
import loginStyles from './loginStyles';
import TextFieldWithError from "../../components/TextFieldWithError";
import AlertMessage from "../../components/AlertMessage";
import {Link} from 'react-router-dom';
import router from '../../contants/router';

const useStyles = makeStyles(theme => loginStyles(theme));

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
        const data = res.data;
        localStorage.setItem('identify', data.id);
        localStorage.setItem('Authorization', data.token);
        AlertMessage.success(data.msg ? data.msg : '登录成功');
        toAdmin();
      } else {
        AlertMessage.failed('登录失败');
      }
    });
  }

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container justify="center" alignItems={"center"} className={classes.container}>
        <Formik
          initialValues={{username: '', password: ''}}
          onSubmit={(values) => onSubmit(values)}
          validationSchema={validationSchema}
        >
          <Form>
            <Paper
              className={classes.paper}
              component={Grid}
              direction="column"
              container
              alignItems="center"
              justify="center">
              <Grid container direction="column">
                {
                  [
                    {name: "username", label: "用户名"},
                    {name: "password", label: "密码", type: "password"}
                  ].map(item => <TextFieldWithError key={item.name} {...item}/>)
                }
              </Grid>
              <Grid className={classes.submit}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth={true}
                  type="submit"
                >
                  登录
                </Button>
                <Button
                  color="primary"
                  fullWidth={true}
                  component={Link}
                  to={router.RECOVER_PASSWORD}
                >
                  忘记密码
                </Button>
              </Grid>
            </Paper>
          </Form>
        </Formik>
      </Grid>
    </Container>
  );

}

export default Login;
