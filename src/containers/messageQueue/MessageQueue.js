import React, {useRef, useEffect, useMemo, useState} from "react";
import Alert from '@material-ui/lab/Alert';
import {useSelector, useDispatch} from "react-redux";
import {createLastMessageSelect, updateMessageState} from "../../redux/globalSlice";
import List from '@material-ui/core/List';
import {Box, Slide, ListItem, Snackbar} from '@material-ui/core';
import useStyles from './messageQueue.style';
import ReactDOM from 'react-dom';
import {maxMessageLength, messageAutoHideDuration} from "../../config/misc";

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
      <Slide in={open} direction={"down"}>
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
      </Slide>
    </Snackbar>
  );
});

function MessageQueue() {
  // length为消息条最大个数
  // autoHideDuration 为自动隐藏时间
  const messages = useSelector(createLastMessageSelect(maxMessageLength));
  const dispatch = useDispatch();
  const timerId = useRef();
  const classes = useStyles();
  //检查最新的消息是否隐藏,如果隐藏则关闭整个消息队列
  const open = useMemo(() => messages.size !== 0, [messages]);
  // 定时清除消息条
  useEffect(() => {
    if (open) {
      timerId.current = setTimeout(() => {
        dispatch(updateMessageState({
          id: messages.getIn([0, 'id']),
          hidden: true
        }));
      }, messageAutoHideDuration);
    }
    return () => clearTimeout(timerId.current);
  }, [dispatch, messages, open]);

  return (
    <>
      {
        open &&
        (
          <List className={classes.root}>
            {
              messages.map(msg => (
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
};


export default React.memo(() => ReactDOM.createPortal(<MessageQueue/>, messageRoot));

