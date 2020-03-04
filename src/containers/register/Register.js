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
  Typography
} from "@material-ui/core";
import RegisterUser from './RegisterUser';
import registerStyles from './styles/registerStyles';
import RegisterEmail from "./RegisterEmail";

const useStyles = makeStyles(theme => (registerStyles(theme)));

function Content({step, formikRef}) {
  if (step === 0) {
    return <RegisterUser {...{formikRef}}/>;
  } else if (step === 1) {
    return <RegisterEmail/>;
  }
}


function Register() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['创建用户','添加邮箱'];
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
            {
              steps.map((label, index) => (
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


export default Register;
