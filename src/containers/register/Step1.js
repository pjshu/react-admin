import {object, ref, string} from "yup";
import {Form, Formik} from "formik";
import {Grid, makeStyles} from "@material-ui/core";
import React from "react";
import api from '../../helpers/http';
import styles from './styles/step1Styles';
import TextFieldWithError from "../../components/TextFieldWithError";

const useStyles = makeStyles(styles);

function CreateUser({formikRef}) {
  const classes = useStyles();
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
          <Grid container justify="space-around" className={classes.name}>
            {
              [
                {name: 'nickname', label: '昵称', variant: "outlined"},
                {name: 'username', label: '用户名', variant: "outlined"}
              ].map(item => (<TextFieldWithError key={item.name} {...item}/>))
            }
          </Grid>

          <Grid container justify="space-around" className={classes.password}>
            {
              [
                {name: 'password', label: '密码', type: "password", variant: "outlined"},
                {name: 'confirmPassword', label: '确认密码', type: "password", variant: "outlined"},
              ].map(item => (
                <TextFieldWithError key={item.name} {...item}/>
              ))
            }
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}

export default CreateUser;
