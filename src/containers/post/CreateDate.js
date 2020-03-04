import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

const CreateDate = ({setFieldValue, create_date}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        margin="normal"
        label="创建日期"
        format="yyyy/MM/dd HH:mm"
        value={create_date}
        onChange={(date) => {
          setFieldValue('create_date', date);
          console.log(date);
        }
        }
      />
    </MuiPickersUtilsProvider>
  );
};

export default CreateDate;
