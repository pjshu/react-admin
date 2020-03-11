import React from 'react';
import {Form, Formik} from "formik";
import {object, ref, string} from 'yup';
import TextFieldWithError from "../../components/TextFieldWithError";
import {Button, Grid} from "@material-ui/core";
import api from '../../helpers/http';
import AlertMessage from "../../components/AlertMessage";

function ResetPassword() {
  const onSubmit = (values) => {
    api.resetPassword(values).then(res => {
      if (res.status === 'success') {
        AlertMessage.success('修改成功');
      } else {
        /**
         * data.msg.old_password.[0: "error"]
         */
        // AlertMessage.failed(res.data.msg);
      }
    });
    console.log(values);
  };
  const validationSchema = object({
    old_password: string()
      .max('30', '密码不能超过30位')
      .required('请输入密码'),
    password: string()
      .max('30', '密码不能超过30位')
      .required('请输入密码'),
    confirm_password: string()
      .oneOf([ref('password'), null], "密码不匹配")
      .max('30', '密码不能超过30位')
      .required('请确认密码'),
  });
  return (
    <Formik
      initialValues={{
        password: '',
        confirm_password: ''
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Grid container direction={"column"}>
          <TextFieldWithError
            style={{
              width: '50%'
            }}
            type={'password'}
            variant="outlined"
            name={'old_password'}
            label={'旧密码'}
          />
          <TextFieldWithError
            style={{
              width: '50%'
            }}
            type={'password'}
            variant="outlined"
            name={'password'}
            label={'新密码'}
          />
          <TextFieldWithError
            type={'password'}
            style={{
              width: '50%'
            }}
            variant="outlined"
            name={'confirm_password'}
            label={'确认密码'}/>
          <Grid style={{
          }}>
            <Button
              type={'submit'}
              style={{
                width: '125px',
                height: '45px'
              }}
              variant="contained"
              color="primary"
            >
              修改密码
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}

export default ResetPassword;
