import React, {useEffect, useRef} from 'react';
import {Field, Form, Formik} from "formik";
import {object, string} from 'yup';
import TextFieldWithError from "../../components/TextFieldWithError";
import {Button, Grid} from "@material-ui/core";
import {
  asyncDecSendCodeTime, selectSecurity, resetSendCodeTime, setIsSendCode,
  sendRestEmailCode, resetEmail
} from '../../redux/userSlice';
import {useDispatch, useSelector} from "react-redux";

function ResetEmail({email}) {
  const dispatch = useDispatch();
  const {initial: {resetEmailInit}, resendTime, isCodeSend} = useSelector(selectSecurity);
  const formikRef = useRef();
  useEffect(() => {
    if (resendTime > 0) {
      dispatch(asyncDecSendCodeTime());
    }
  }, [resendTime]);

  const onSubmit = (values) => {
    dispatch(resetEmail(values));
  };

  const handleSendCode = () => {
    dispatch(resetSendCodeTime());
    dispatch(setIsSendCode());
    const {setFieldValue, values} = formikRef.current;
    if (values.email === email) {
      setFieldValue('email', '');
    }
    dispatch(sendRestEmailCode());
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
        initialValues={resetEmailInit}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <Grid container direction={"column"}>
            <Field
              as={TextFieldWithError}
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
              <Field
                as={TextFieldWithError}
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
