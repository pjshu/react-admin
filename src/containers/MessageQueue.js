import React, {useCallback, useEffect, useMemo, useState} from "react";
import Alert from '@material-ui/lab/Alert';
import {useSelector} from "react-redux";
import {selectMessage} from "../redux/globalSlice";
import List from '@material-ui/core/List';
import {Box, Fade, ListItem, Snackbar} from '@material-ui/core';
import {getTimeStamp} from '../helpers/datetime';
import useStyles from './messageQueue.style';
import ReactDOM from 'react-dom';
import {areEqual} from "../helpers/misc";

const messageRoot = document.getElementById('message-root');


const Message = React.memo(function Message({msg}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleOnclose = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Snackbar classes={{
      root: classes.snackbar
    }} open={open}>
      <Fade in={open}>
        <Box
          component={Alert}
          className={classes.box}
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
}, areEqual);

const MessageQueue = React.memo(function MessageQueue(props) {
  const {message} = useSelector(selectMessage);
  return <ContextMessageQueue message={message} {...props}/>;
}, areEqual);

// length为消息条最大个数
// autoHideDuration 为自动隐藏时间
const ContextMessageQueue = React.memo(function ContextMessageQueue({length = 3, autoHideDuration = 3000, message}) {
  const [newlyMessages, setNewlyMessages] = useState([]);
  const timerId = React.useRef();
  const classes = useStyles();

  const newMessageLength = useMemo(() => {
    return newlyMessages.length;
  }, [newlyMessages.length]);

  const addNewlyMessage = useCallback((message) => {
    let isNew = true;
    for (let newlyMessage of newlyMessages) {
      if (message.id === newlyMessage.id) {
        isNew = false;
        break;
      }
    }
    if (isNew) {
      setNewlyMessages([...newlyMessages, message]);
    }
  }, [newlyMessages]);

  const checkNewlyMessages = React.useCallback((diffTime = autoHideDuration - 1) => {
    return newMessageLength >= length || diffTime > autoHideDuration;
  }, [autoHideDuration, length, newMessageLength]);

  //添加消息条
  useEffect(() => {
    if (checkNewlyMessages()) {
      return;
    }
    for (let item of message.slice().reverse()) {
      let diffTime = getTimeStamp() - getTimeStamp(item.time);
      if (checkNewlyMessages(diffTime)) {
        break;
      }
      addNewlyMessage(item);
    }
  }, [addNewlyMessage, checkNewlyMessages, message]);
  // 定时清除消息条
  useEffect(() => {
    if (newMessageLength > 0) {
      timerId.current = setTimeout(() => {
        setNewlyMessages(newlyMessages => newlyMessages.slice(1,));
      }, autoHideDuration);
    }
    return () => clearTimeout(timerId.current);
  }, [autoHideDuration, newMessageLength]);

  return (
    <>
      {
        newMessageLength === 0 ?
          null :
          (
            <List className={classes.root}>
              {
                newlyMessages.map(msg => (
                  <ListItem key={msg.id} className={classes.listItem}>
                    <Message msg={msg}/>
                  </ListItem>
                ))
              }
            </List>
          )
      }
    </>
  );
}, areEqual);


export default () => ReactDOM.createPortal(<MessageQueue/>, messageRoot);

