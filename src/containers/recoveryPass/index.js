import React from 'react';
import RecoveryPassword from './RecoveryPassword';
import {injectReducer} from "../../redux/store";
import reducer from '../../redux/userSlice';

function Index() {
  injectReducer('user', reducer);
  return (
    <RecoveryPassword/>
  );
}

export default Index;
