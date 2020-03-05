import React from 'react';
import {Form, Formik} from "formik";
import {object, ref, string} from 'yup';
import TextFieldWithError from "../../components/TextFieldWithError";
import {Button} from "@material-ui/core";

function ResetPassword(email_is_validate) {
  const onSubmit = (values) => {
    console.log(values);
  };
  const handleSendCode = () => {

  };
  const validationSchema = object({});
  return (
    <Formik
      initialValues={{
        email: '',
        code: ''
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <TextFieldWithError name={'email'} label={'邮箱'}/>
        <Button
          style={{
            width: '125px',
            height: '45px'
          }}
          variant="contained"
          color="primary"
          onClick={handleSendCode}
        >
          验证邮箱
        </Button>
      </Form>
    </Formik>
  );
}

export default ResetPassword;
