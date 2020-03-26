import React, {useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {render} from "react-dom";

// TODO: 列消息, 多条消息有显示问题
const Message = ({message, severity, time}) => {
  const [open, setOpen] = useState(true);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Snackbar open={open} autoHideDuration={time} onClose={handleClose}>
      <Alert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

const createMessage = (message, time, severity) => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  render(<Message {...{message, severity, time}}/>, div);
  setTimeout(() => {
    document.body.removeChild(div);
  }, time);
};
export default {
  success(message, time = 6000) {
    createMessage(message, time = 6000, 'success');
  },
  failed(message, time = 6000) {
    createMessage(message, time = 6000, 'error');
  }
};

