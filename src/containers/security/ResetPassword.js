import React from 'react';
import {Form, Formik} from "formik";
import {object, ref, string} from 'yup';
import TextFieldWithError from "../../components/TextFieldWithError";
import {Button} from "@material-ui/core";

function ResetPassword() {
  const onSubmit = (values) => {
    console.log(values)
  };
  const validationSchema = object({
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
        <TextFieldWithError name={'password'} label={'新密码'}/>
        <TextFieldWithError name={'confirm_password'} label={'确认密码'}/>
        <Button
          type={'submit'}
          style={{
            width: '125px',
            height: '45px'
          }}
          variant="contained"
          color="primary"
        >
          提交
        </Button>
      </Form>
    </Formik>
  );
}

export default ResetPassword;
