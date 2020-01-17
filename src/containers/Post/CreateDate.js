import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

const CreateDate = ({setFieldValue, createDate}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        margin="normal"
        label="创建日期"
        format="yyyy/MM/dd HH:mm"
        value={createDate}
        onChange={(date) =>
          setFieldValue('createDate', date)
        }
      />
    </MuiPickersUtilsProvider>
  );
};

export default CreateDate;
