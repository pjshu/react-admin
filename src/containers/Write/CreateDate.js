import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

export default function CreateDate(props) {
  const {setFieldValue, createDate} = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        margin="normal"
        label="创建日期"
        format="yyyy/MM/dd HH:mm"
        value={createDate}
        onChange={(date) => setFieldValue('createDate', date)}
      />
    </MuiPickersUtilsProvider>
  );
}
