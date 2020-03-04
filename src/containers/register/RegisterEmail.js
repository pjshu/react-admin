import React from 'react';
import {Form, Formik} from "formik";
import {object, string, number} from "yup";
import TextFieldWithError from "../../components/TextFieldWithError";
import {Grid} from "@material-ui/core";

function RegisterEmail() {
  const validationSchema = object({
    'email': string()
      .email('请输入正确的邮箱格式')
      .required('请输入邮箱'),
    // TODO 验证码位数
    'code': number()
      .required('请输入验证码')
      .integer('请输入正确的验证码')
      .min(100000,'请输入正确的验证码')
      .max(999999, '请输入正确的验证码')
  });
  const onsubmit = () => {

  };

  return (
    <Formik
      initialValues={{email: '', code: ''}}
      onSubmit={onsubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Grid container direction={"column"}>
          <Grid style={{width: '45%', marginBottom: '50px'}}>
            <TextFieldWithError
              variant={"outlined"}
              name={'email'}
              label={'邮箱'}/>
          </Grid>
          <Grid style={{
            // visibility: 'hidden',
            // display: 'none',
            width: '45%',
            marginBottom: '40px'
          }}>
            <TextFieldWithError
              variant={"outlined"}
              name={'code'}
              label={'验证码'}/>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}

export default RegisterEmail;
