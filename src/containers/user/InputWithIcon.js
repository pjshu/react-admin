import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import {Field} from 'formik';

export default function InputWithIcon({icon, label, info, name, ...other}) {

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        {icon}
      </Grid>
      <Grid item>
        <Field as={TextField} name={name} label={label} variant="outlined" {...other}/>
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
