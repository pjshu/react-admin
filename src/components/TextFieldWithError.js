import React from 'react';
import {Field, useFormikContext} from "formik";
import TextField from "@material-ui/core/TextField";

const TextFieldWithError = ({name, label, ...rest}) => {
  let {errors, touched} = useFormikContext();

  const error = React.useMemo(() => {
    return !!errors[name] && !!touched[name];
  }, [errors, name, touched]);

  return (
    <Field
      as={TextField}
      name={name}
      label={label}
      color="primary"
      fullWidth={true}
      error={error}
      helperText={error ? errors[name] : ""}
      {...rest}
    />
  );
};
export default React.memo(TextFieldWithError);
