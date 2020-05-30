import React, {useCallback} from 'react';
import {Button, Grid, Step, StepContent, StepLabel, Stepper,} from "@material-ui/core";
import RegisterUser from './RegisterUser';
import useStyles from './register.style';
import RegisterEmail from "./RegisterEmail";
import SubmitModal from "./Modal";
import {decrementActiveStep, increaseActiveStep, selectActiveStep} from "../../redux/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {changeFormError, createFormSelector} from "../../redux/formSlice";
import {validateRegister} from "../../helpers/validate";
import FORM from "../../contants/form.json";

function Content({step, ...other}) {
  if (step === 0) {
    return <RegisterUser {...other}/>;
  } else if (step === 1) {
    return <RegisterEmail {...other}/>;
  }
}


function Register() {
  const classes = useStyles();
  const activeStep = useSelector(selectActiveStep);
  const dispatch = useDispatch();
  const steps = ['创建用户(必选)', '添加邮箱(可选)'];

  const handleBack = useCallback(() => {
    dispatch(decrementActiveStep());
  }, [dispatch]);


  return (
    <div className={classes.root}>
      <Grid
        component={'form'}
        container
        justify="center"
        alignItems="center"
        className={classes.container}>
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
                            <NextButton/>
                          ) :
                          <SubmitModal/>
                      }
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
        </Stepper>
      </Grid>
    </div>
  );
}


const NextButton = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const register = useSelector(createFormSelector(FORM.register));
  const handleNext = useCallback(() => {
    validateRegister.validate({
      ...register,
    }).then((res) => {
      dispatch(increaseActiveStep());
    }).catch(({path = '', errors = ['']}) => {
      dispatch(changeFormError({
        name: path,
        value: errors[0]
      }));
    });
    // if (activeStep === 0) {
    //   for (let key of Object.keys(errors)) {
    //     if (key !== 'email' && errors[key]) {
    //       return false;
    //     }
    //   }
    // }
  }, [dispatch, register]);


  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleNext}
      className={classes.button}
    >
      下一步
    </Button>
  );
};

export default Register;
