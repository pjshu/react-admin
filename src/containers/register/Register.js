import React from 'react';
import {
  Button,
  Container,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import RegisterUser from './RegisterUser';
import useStyles from './register.styles';
import RegisterEmail from "./RegisterEmail";
import {Form, Formik} from "formik";
import Modal from "./Modal";
import {selectRegister, increaseActiveStep, decrementActiveStep, register, closeModal} from "../../redux/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {validateRegister} from '../../helpers/validate'

function Content({step, ...other}) {
  if (step === 0) {
    return <RegisterUser {...other}/>;
  } else if (step === 1) {
    return <RegisterEmail {...other}/>;
  }
}


function Register() {
  const classes = useStyles();
  const {initial, activeStep} = useSelector(selectRegister());
  const dispatch = useDispatch();
  const steps = ['创建用户(必选)', '添加邮箱(可选)'];
  const formikRef = React.useRef();
  const handleNext = () => {
    const errors = formikRef.current.errors;
    if (activeStep === 0 && !errors.user) {
      dispatch(increaseActiveStep());
    } else {
      // TODO:
      dispatch(decrementActiveStep());
    }
  };

  const handleBack = () => {
    dispatch(decrementActiveStep());
  };

  const onsubmit = (values) => {
    const data = {...values.user, ...values.email};
    dispatch(closeModal());
    dispatch(register(data));
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
          validationSchema={validateRegister}
          onSubmit={onsubmit}
          initialValues={initial}
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
                            activeStep !== steps.length - 1 ? (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={handleNext}
                                  className={classes.button}
                                >
                                  下一步
                                </Button>
                              ) :
                              <Modal/>
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
