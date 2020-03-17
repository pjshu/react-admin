import React, {useEffect} from 'react';
import {Container, Grid} from "@material-ui/core";
import ResetPassword from "./ResetPassword";
import ValidateEmail from './ResetEmail';
import {getUserEmail} from '../../redux/userSlice';
import {useDispatch} from "react-redux";


function Security({setLoading}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserEmail(setLoading));
  }, []);

  return (
    <Container>
      <Grid container direction={"column"} spacing={5}>
        <Grid item>
          <ResetPassword/>
        </Grid>
        <Grid item>
          <ValidateEmail/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Security;
