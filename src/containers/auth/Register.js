import React from 'react';
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from "@material-ui/core";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {object, ref, string} from "yup";
import Alert from "@material-ui/lab/Alert";
import api from '../../helpers/http';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 800,
    height: '100%',
    width: '100%',
  },
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function Content({step, formikRef}) {
  if (step === 0) {
    return <CreateUser {...{formikRef}}/>;
  }
}


function Register() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['创建用户'];
  const formikRef = React.useRef();

  const handleNext = () => {
    const errors = formikRef.current.errors;
    if (Object.values(errors).length === 0) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container className={classes.container}>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.container}>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Content {...{step: index, formikRef}}/>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        回退
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                        form={"form"}
                        type="submit"
                      >
                        {activeStep === steps.length - 1 ? '完成' : '下一步'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>注册成功</Typography>
              <Button onClick={handleReset} className={classes.button}>
                重置
              </Button>
            </Paper>
          )}
        </div>
      </Grid>
    </Container>
  );
}


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

export default Register;
