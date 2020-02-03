import React from 'react';
import {Grid, makeStyles, TextField} from '@material-ui/core';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import {Field} from 'formik';

const useStyle = makeStyles({
  root: {}
});
export default function InputWithIcon({icon, label, info, name, ...other}) {

  return (
    <Grid container spacing={5} alignItems="center">
      <Grid item>
        {icon}
      </Grid>
      <Grid item>
        <Field
          fullWidth={true}
          as={TextField}
          name={name}
          label={label}
          variant="outlined" {...other}/>
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
