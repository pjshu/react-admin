import React, {useState} from "react";
import Alert from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {selectMessage, closeMessage} from "../redux/globalSlice";
import List from '@material-ui/core/List';
import {ListItem, Box, Fade, Snackbar, SnackbarContent, makeStyles} from '@material-ui/core';

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
    }} onClose={handleOnclose} open={open} autoHideDuration={6000}>
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
  //TODO: 使用最近时间的至多三个(时间隔太久不加入该列表)
  const newlyMessage = message.slice(-length);
  return (
    <List style={{
      display: 'block',
      zIndex: '1000',
      position: "absolute",
      bottom: 0,
      left: '10%',
      // transform: 'translateX(-50%)',
      height: 200,
      width: 200,
    }}>
      {
        newlyMessage.map(msg => (
          <ListItem>
            <Message key={msg.id} msg={msg}/>
          </ListItem>
        ))
      }
    </List>
  );
};

export default MessageQueue;
