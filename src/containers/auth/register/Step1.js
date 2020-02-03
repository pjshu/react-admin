import {object, ref, string} from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Grid, TextField} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import api from '../../../helpers/http';

function CreateUser({formikRef}) {

  const validationSchema = object({
    username: string()
      .max('20', '用户名不能超过20位')
      .required('请输入邮箱'),
    nickname: string()
      .max('20', '昵称不能超过20位')
      .required('请输入昵称'),
    password: string()
      .max('30', '密码不能超过30位')
      .required('请输入密码'),
    confirmPassword: string()
      .oneOf([ref('password'), null], "密码不匹配")
      .max('30', '密码不能超过30位')
      .required('请确认密码'),
  });
  const onsubmit = (values) => {
    api.register(values).then(res => {
      if (res.status === 'success') {
        localStorage.setItem('identify', res.data.userId);
      }
      console.log(res);
    });
    console.log('values', values);
  };

  return (
    <Formik
      innerRef={formikRef}
      validationSchema={validationSchema}
      initialValues={{username: '', nickname: '', password: '', confirmPassword: ''}}
      onSubmit={onsubmit}
    >
      <Form id={'form'}>
        <Grid container>
          <Grid container justify="space-around">
            <Grid style={{width: '45%'}}>
              <Field
                name="nickname"
                as={TextField}
                label="昵称"
                color="primary"
                variant={"outlined"}
                fullWidth={true}
              />
            </Grid>

            <Grid style={{width: '45%'}}>
              <Field
                name="username"
                as={TextField}
                label="用户名"
                color="primary"
                variant={"outlined"}
                fullWidth={true}
              />
            </Grid>
          </Grid>
          <Grid container justify="space-around" style={{marginTop: 5}}>
            <ErrorMessage
              style={{background: '#fff'}}
              name="nickname"
              component={Alert}
              severity="error"/>
            <ErrorMessage
              style={{background: '#fff'}}
              name="username"
              component={Alert}
              severity="error"/>
          </Grid>
          <Grid container justify="space-around" style={{marginTop: 40}}>
            <Grid style={{width: '45%'}}>
              <Field
                name="password"
                type="password"
                as={TextField}
                label="密码"
                color="primary"
                variant={"outlined"}
                fullWidth={true}
              />
            </Grid>
            <Grid style={{width: '45%'}}>
              <Field
                name="confirmPassword"
                type="password"
                as={TextField}
                label="确认密码"
                color="primary"
                variant={"outlined"}
                fullWidth={true}
              />
            </Grid>
          </Grid>
          <Grid container justify="space-around" style={{marginTop: 5}}>
            <ErrorMessage
              style={{background: '#fff'}}
              name="password"
              component={Alert}
              severity="error"/>
            <ErrorMessage
              style={{background: '#fff'}}
              name="confirmPassword"
              component={Alert}
              severity="error"/>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}

export default CreateUser;
