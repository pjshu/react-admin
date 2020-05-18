import 'date-fns';
import React, {useCallback} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {Field} from "./Form";

const TimePickField = ({format = "yyyy/MM/dd HH:mm", formName}) => {

  const getValue = useCallback((data) => {
    return data;
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Field
        formName={formName}
        name={'change_date'}
        getValue={getValue}
        as={KeyboardDateTimePicker}
        margin="normal"
        label={'创建日期'}
        format={format}
      />
    </MuiPickersUtilsProvider>
  );
};

export default React.memo(TimePickField);
