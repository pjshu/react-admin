import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

const TimePickField = ({handleOnChange, data, label, format = "yyyy/MM/dd HH:mm"}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        margin="normal"
        label={label}
        format={format}
        value={data}
        onChange={handleOnChange}
      />
    </MuiPickersUtilsProvider>
  );
};

export default TimePickField;
