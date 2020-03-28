import React, {useState} from "react";
import Alert from '@material-ui/lab/Alert';
import {useSelector} from "react-redux";
import {selectMessage} from "../redux/globalSlice";
import List from '@material-ui/core/List';
import {Box, Fade, ListItem, Snackbar} from '@material-ui/core';
import {getTimeStamp} from '../helpers/datetime';
import useStyles from './messageQueue.style';
import ReactDOM from 'react-dom';

const messageRoot = document.getElementById('message-root');


const Message = ({msg}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleOnclose = () => {
    setOpen(false);
  };

  return (
    <Snackbar classes={{
      root: classes.snackbar
    }} onClose={handleOnclose} autoHideDuration={6000} open={open}>
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
};

const MessageQueue = ({length = 3}) => {
  const {message} = useSelector(selectMessage);
  const classes = useStyles();
  // TODO
  const newlyMessage = React.useMemo(() => {
    return message.slice().reverse().filter(item => {
      // 只显示6000毫秒内的消息
      return getTimeStamp() - getTimeStamp(item.time) < 6000;
    }).slice(-length).reverse();
  }, [length, message]);

  return (
    <>
      {
        newlyMessage.length === 0 ?
          null :
          (
            <List className={classes.root}>
              {
                newlyMessage.map(msg => (
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
};

export default () => ReactDOM.createPortal(<MessageQueue/>, messageRoot);

