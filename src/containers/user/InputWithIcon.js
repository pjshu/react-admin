import React from 'react';
import {Grid, TextField} from '@material-ui/core';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import {Field} from 'formik';
import TextFieldWithError from '../../components/TextFieldWithError';

export default function InputWithIcon({icon, label, info, name, ...other}) {

  return (
    <Grid container spacing={5} alignItems="center">
      <Grid item>
        {icon}
      </Grid>
      <Grid item>
        <TextFieldWithError
          name={name}
          variant="outlined"
          label={label}
          {...other}
        />
        {/*<Field*/}
        {/*  fullWidth={true}*/}
        {/*  as={TextField}*/}
        {/*  name={name}*/}
        {/*  label={label}*/}
        {/*  variant="outlined"/>*/}
      </Grid>
      {
        info ?
          <Grid item title={info}>
            <ContactSupportIcon/>
          </Grid>
          : null
      }
    </Grid>
  );
}
