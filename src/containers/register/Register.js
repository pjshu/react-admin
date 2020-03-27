import React from 'react';
import {Button, Grid, Step, StepContent, StepLabel, Stepper,} from "@material-ui/core";
import RegisterUser from './RegisterUser';
import useStyles from './register.style';
import RegisterEmail from "./RegisterEmail";
import {Form, Formik} from "formik";
import Modal from "./Modal";
import {closeModal, decrementActiveStep, increaseActiveStep, register, selectRegister} from "../../redux/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {validateRegister} from '../../helpers/validate';

function Content({step, ...other}) {
  if (step === 0) {
    return <RegisterUser {...other}/>;
  } else if (step === 1) {
    return <RegisterEmail {...other}/>;
  }
}


function Register() {
  const classes = useStyles();
  const {initial, activeStep} = useSelector(selectRegister);
  const dispatch = useDispatch();
  const steps = ['创建用户(必选)', '添加邮箱(可选)'];
  const formRef = React.useRef();

  const canNext = React.useCallback(() => {
    const errors = formRef.current.errors;
    if (activeStep === 0) {
      for (let key of Object.keys(errors)) {
        if (key !== 'email' && errors[key]) {
          return false;
        }
      }
    }
    return true;
  }, [activeStep]);

  const handleNext = React.useCallback(() => {
    if (canNext()) {
      dispatch(increaseActiveStep());
    }
  }, [canNext, dispatch]);

  const handleBack = React.useCallback(() => {
    dispatch(decrementActiveStep());
  }, [dispatch]);

  const onsubmit = React.useCallback((values) => {
    dispatch(closeModal());
    dispatch(register(values));
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.container}>
        <Formik
          innerRef={formRef}
          validationSchema={validateRegister}
          onSubmit={onsubmit}
          initialValues={initial}
        >
          <Form id={'form'} className={classes.form}>
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
    </div>
  );
}


export default Register;
