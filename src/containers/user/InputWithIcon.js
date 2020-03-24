import React from 'react';
import {Grid} from '@material-ui/core';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import TextFieldWithError from '../../components/TextFieldWithError';
import {useFormikContext} from "formik";

export default function InputWithIcon({icon, label, info, name, ...other}) {
  const {errors, touched} = useFormikContext();
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
          {...{...other, errors, touched}}
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
