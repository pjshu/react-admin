import React from 'react';
import {Container, Grid} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Form, Formik} from 'formik';
import {object, string} from 'yup';
import loginStyles from './login.styles';
import TextFieldWithError from "../../components/TextFieldWithError";
import {Link} from 'react-router-dom';
import router from '../../contants/router';
import {login, selectLogin} from '../../redux/userSlice';
import {useDispatch, useSelector} from "react-redux";


const useStyles = makeStyles(theme => loginStyles(theme));

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {initial} = useSelector(selectLogin);
  const validationSchema = object({
    username: string()
      .max('30', '用户名不能超过30位')
      .required('请输入用户名'),
    password: string()
      .max('30', '密码不能超过30位')
      .required('请输入密码')
  });

  function onSubmit(values) {
    dispatch(login(values));
  }

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container justify="center" alignItems={"center"} className={classes.container}>
        <Formik
          initialValues={initial}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {
            ({errors, touched}) => (
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
                  <Grid item style={{
                    width: '100%'
                  }}>
                    <Grid container direction="column" spacing={2}>
                      {
                        [
                          {name: "username", label: "用户名", variant: "outlined"},
                          {name: "password", label: "密码", type: "password", variant: "outlined"}
                        ].map(item => (
                          <Grid item key={item.name}>
                            <TextFieldWithError {...{...item, errors, touched}}/>
                          </Grid>
                        ))
                      }
                    </Grid>
                  </Grid>
                  <Grid item className={classes.submit}>
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
            )
          }
        </Formik>
      </Grid>
    </Container>
  );

}

export default Login;
