import React, {useRef, useCallback, useEffect, useMemo, useState} from "react";
import Alert from '@material-ui/lab/Alert';
import {useSelector, useDispatch} from "react-redux";
import {selectMessage, setMessageState} from "../../redux/globalSlice";
import List from '@material-ui/core/List';
import {Box, Fade, ListItem, Snackbar} from '@material-ui/core';
import {getTimeStamp} from '../../helpers/datetime';
import useStyles from './messageQueue.style';
import ReactDOM from 'react-dom';
import {areEqual} from "../../helpers/misc";

const messageRoot = document.getElementById('message-root');

const Message = React.memo(function Message({msg}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleOnclose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const styles = useMemo(() => ({
    root: classes.snackbar
  }), [classes.snackbar]);

  return (
    <Snackbar classes={styles} open={open}>
      <Fade in={open}>
        <Box
          component={Alert}
          className={classes.box}
          variant="filled"
          severity={msg.get("state")}
          boxShadow={5}
          onClose={handleOnclose}
        >
          {msg.get('message')}
        </Box>
      </Fade>
    </Snackbar>
  );
}, areEqual);

// length为消息条最大个数
// autoHideDuration 为自动隐藏时间
const MessageQueue = React.memo(function MessageQueue(props) {
  const {MAX_MESSAGE_LENGTH = 3, autoHideDuration = 3000} = props;
  const messages = useSelector(selectMessage);
  const dispatch = useDispatch();
  const [newMessages, setNewMessages] = useState([]);
  const timerId = useRef();
  const classes = useStyles();
  const addNewMessage = useCallback((message) => {
    setNewMessages(newMessages => [...newMessages, message]);
  }, []);


  //检查是否newMessages列表需要添加该消息
  const checkNewMessages = useCallback((diffTime = autoHideDuration - 1, message = null) => {
    let isNew = newMessages.length < MAX_MESSAGE_LENGTH || diffTime < autoHideDuration;
    isNew = message ? newMessages.includes(message) : isNew;
    return isNew;
  }, [autoHideDuration, MAX_MESSAGE_LENGTH, newMessages]);

  //添加消息条,
  useEffect(() => {
    //从最新添加的(MAX_MESSAGE_LENGTH)个消息条中
    //找到没有隐藏的消息条(隐藏延迟时间 > 已经存在时间)
    for (let item of messages.slice(-MAX_MESSAGE_LENGTH)) {
      let diffTime = getTimeStamp() - getTimeStamp(item.get('time'));
      if (!item.get('hidden') && checkNewMessages(diffTime, item)) {
        return;
      }
      addNewMessage(item);
    }
  }, [MAX_MESSAGE_LENGTH, addNewMessage, checkNewMessages, messages]);

  // 定时清除消息条
  useEffect(() => {
    if (newMessages.length > 0) {
      timerId.current = setTimeout(() => {
        setNewMessages(newMessages =>
          newMessages.slice(1,)
        );
      }, autoHideDuration);
    }
    return () => clearTimeout(timerId.current);
  }, [autoHideDuration, dispatch, newMessages.length]);

  return (
    <>
      {
        newMessages.length !== 0 &&
        (
          <List className={classes.root}>
            {
              newMessages.map(msg => (
                <ListItem key={msg.get('id')} className={classes.listItem}>
                  <Message msg={msg}/>
                </ListItem>
              ))
            }
          </List>
        )
      }
    </>
  );
});


export default () => ReactDOM.createPortal(<MessageQueue/>, messageRoot);

