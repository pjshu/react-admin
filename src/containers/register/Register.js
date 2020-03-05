import React from 'react';
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import RegisterUser from './RegisterUser';
import registerStyles from './styles/registerStyles';
import RegisterEmail from "./RegisterEmail";
import {Form, Formik} from "formik";
import AlertMessage from "../../components/AlertMessage";
import api from '../../helpers/http';
import Modal from "./Modal";
import {toLogin} from "../../history";

const useStyles = makeStyles(theme => (registerStyles(theme)));

function Content({step, ...other}) {
  if (step === 0) {
    return <RegisterUser {...other}/>;
  } else if (step === 1) {
    return <RegisterEmail {...other}/>;
  }
}


function Register({validationSchema}) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['创建用户(必选)', '添加邮箱(可选)'];
  const formikRef = React.useRef();
  const handleNext = () => {
    const errors = formikRef.current.errors;
    if (activeStep === 0 && !errors.user) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const onsubmit = (values) => {
    const data = {...values.user, ...values.email};
    setModalOpen(false);
    api.register(data).then(res => {
      if (res.status === 'success') {
        AlertMessage.success('注册成功');
        toLogin();
      } else {
        AlertMessage.failed(res.data.msg);
      }
    });
  };

  return (
    <Container className={classes.container}>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.container}>
        <Formik
          innerRef={formikRef}
          validationSchema={validationSchema}
          onSubmit={onsubmit}
          initialValues={{
            user: {username: '', nickname: '', password: '', confirm_password: ''},
            email: {email: ''}
          }}
        >
          <Form id={'form'} className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {
                steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <Content {...{step: index}}/>
                      <div className={classes.actionsContainer}>
                        <div>
                          <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.button}
                          >
                            回退
                          </Button>
                          {
                            activeStep !== steps.length - 1 ?
                              (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={handleNext}
                                  className={classes.button}
                                >
                                  下一步
                                </Button>
                              ) :
                              <Modal {...{open: modalOpen, setOpen: setModalOpen}}/>
                          }
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                ))}
            </Stepper>
          </Form>
        </Formik>
      </Grid>
    </Container>
  );
}


export default Register;
