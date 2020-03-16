import React, {useEffect, useState, createRef, useRef} from 'react';
import {Field, Form, Formik} from "formik";
import {object, string} from 'yup';
import TextFieldWithError from "../../components/TextFieldWithError";
import {Button, Grid} from "@material-ui/core";
import api from '../../helpers/http';
import AlertMessage from "../../components/AlertMessage";


function ResetEmail({email}) {
  const [resendTime, setResendTime] = useState(0);
  const [isCodeSend, setIsCodeSend] = useState(false);
  const formikRef = useRef();
  useEffect(() => {
    if (resendTime > 0) {
      setTimeout(() => {
        setResendTime(preTime => preTime - 1);
      }, 1000);
    }
  }, [resendTime]);

  const onSubmit = (values) => {
    api.resetEmail(values).then(res => {
      console.log(res);
      if (res.status === 'success') {
        AlertMessage.success('修改成功');
      } else {
        AlertMessage.failed(res.data.msg);
      }
    });
    console.log(values);
  };

  const handleSendCode = () => {
    setResendTime(60);
    setIsCodeSend(true);
    const {setFieldValue, values} = formikRef.current;
    if (values.email === email) {
      setFieldValue('email', '');
    }
    AlertMessage.success('已发送验证码至邮箱');
    api.sendRestEmailCode().then(res => {
      console.log(res);
      if (res.status === 'success') {
        AlertMessage.success('验证码发送成,请查收邮箱');
      } else {
        AlertMessage.failed(res.data.msg);
      }
    });
  };
  const validationSchema = object({
    email: string()
      .email('请输入正确的邮箱格式')
      .required('请输入邮箱'),
    // TODO 验证码位数
    code: string()
      .required('请输入验证码')
  });
  return (
    <Grid item>
      <Formik
        innerRef={formikRef}
        initialValues={{
          email: email,
          code: ''
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
              variant="outlined"
              disabled={!isCodeSend}
              name={'email'}
              label={'邮箱'}
            />
            <Grid style={{}}>
              <Button
                style={{
                  width: '125px',
                  height: '45px'
                }}
                disabled={resendTime > 0}
                variant="contained"
                color="primary"
                onClick={handleSendCode}
              >
                {
                  `
                    ${resendTime > 0 ? `重新发送(${resendTime})` : `${isCodeSend ? '重新发送' : '修改邮箱'}`}
                   `
                }
              </Button>
            </Grid>

            <Grid
              style={{
                marginTop: '50px',
                display: isCodeSend ? '' : 'none'
              }}
            >
              <TextFieldWithError
                style={{
                  width: '50%'
                }}
                variant="outlined"
                name={'code'}
                label={'验证码'}
              />
              <Grid style={{}}>
                <Button
                  style={{
                    width: '125px',
                    height: '45px'
                  }}
                  variant="contained"
                  color="primary"
                  type={'submit'}
                >
                  提交
                </Button>
              </Grid>
            </Grid>

          </Grid>
        </Form>
      </Formik>
    </Grid>
  );
}

export default ResetEmail;
