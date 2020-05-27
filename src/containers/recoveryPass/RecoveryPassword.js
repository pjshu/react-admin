import React from 'react';
import {Container, Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {
  selectValidateCode
} from '../../redux/userSlice';
import {useSelector} from "react-redux";
import useStyles from './recoveryPassword.style';
import {Field} from '../../components/Form';
import {Timing, HiddenField} from "./Items";
import {FORM} from "../../redux/formSlice";


const RecoveryPassword = () => {
  const data = useSelector(selectValidateCode);
  const isSendCode = data.get('isSendCode');
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid
        className={classes.container}
        container
        justify="center"
        alignItems={"center"}
      >
        <Paper
          className={classes.paper}
          component={Grid}
          alignItems={'center'}
          container
          spacing={3}
        >
          <Grid
            item
            container
            direction={'row'}
            alignItems={"center"}
          >
            <Field
              autoComplete={'on'}
              variant="outlined"
              name={'email'}
              label={"邮箱"}
              formName={FORM.recoveryPasswordSendCode}
              className={classes.textField}
            />
            <Timing/>
          </Grid>
          {
            isSendCode && <HiddenField/>
          }
        </Paper>
      </Grid>
    </Container>
  );
};


export default React.memo(RecoveryPassword);
