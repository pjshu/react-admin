import React, {useState} from "react";
import Alert from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {selectMessage, closeMessage} from "../redux/globalSlice";
import List from '@material-ui/core/List';
import {ListItem, Box, Fade, Snackbar, SnackbarContent, makeStyles} from '@material-ui/core';
import {getTimeStamp} from '../helpers/datetime';

const useStyles = makeStyles({
  snackbarRoot: {
    position: 'relative'
  }
});

const Message = ({msg}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleOnclose = () => {
    setOpen(false);
  };

  return (
    <Snackbar classes={{
      root: classes.snackbarRoot
    }} onClose={handleOnclose} autoHideDuration={6000} open={open}>
      <Fade in={open}>
        <Box
          component={Alert}
          style={{width: '100%'}}
          variant="filled"
          severity={msg.state}
          boxShadow={5}
          onClose={handleOnclose}
        >
          {msg.message}
        </Box>
      </Fade>
    </Snackbar>
  );
};

const MessageQueue = ({length = 3}) => {
  const {message} = useSelector(selectMessage);
  // TODO
  let newlyMessage = message.slice().reverse().filter(item => {
    // 只显示6000毫秒内的消息
    return getTimeStamp() - getTimeStamp(item.time) < 6000;
  }).slice(-length).reverse();
  return (
    <List style={{
      flexDirection: 'column-reverse',
      display: 'flex',
      zIndex: '1000',
      position: "absolute",
      bottom: 0,
      left: '10%',
      // transform: 'translateX(-50%)',
      height: 200,
      minWidth: 200,
      maxWidth: 300,
    }}>
      {
        newlyMessage.map(msg => (
          <ListItem key={msg.id} style={{
            display: 'block'
          }}>
            <Message msg={msg}/>
          </ListItem>
        ))
      }
    </List>
  );
};

export default MessageQueue;
