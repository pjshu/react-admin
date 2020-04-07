import React, {useCallback, useEffect, useMemo} from 'react';
import {Button, Container, Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {
  selectRecoveryPassword,
} from '../../redux/userSlice';
import {useSelector} from "react-redux";
import useStyles from './recoveryPassword.style';
import {Field} from '../../components/Form';
import {Timing, HiddenField} from "./Items";


const RecoveryPassword = () => {
  const {isSendCode} = useSelector(selectRecoveryPassword);
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
              name={'email'}
              label={"邮箱"}
              className={classes.textField}
              formName={'recoveryPassword'}
            />
            <Timing/>
          </Grid>
          {
            isSendCode ? <HiddenField/> : null
          }
        </Paper>
      </Grid>
    </Container>
  );
};


export default React.memo(RecoveryPassword);
