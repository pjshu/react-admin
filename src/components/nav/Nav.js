import React, {useCallback} from 'react';
import {
  AppBar,
  Badge,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Router from './Router';
import {Link} from "react-router-dom";
import router from '../../contants/router';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import FaceIcon from '@material-ui/icons/Face';
import useStyles from './nav.style';
import SecurityIcon from '@material-ui/icons/Security';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import MailIcon from '@material-ui/icons/Mail';
import Alert from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {clearAllMessage, removeMessage, selectMessage} from "../../redux/globalSlice";
import {logout} from '../../redux/userSlice';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {areEqual} from "../../helpers/misc";

const Nav = React.memo(function Nav() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [messageMenu, setMessageMenu] = React.useState({
    anchorEl: null,
    open: false,
  });

  const handleDrawerOpen = useCallback(() => {
    setOpen((open) => !open);
  }, []);


  const handleMenuClose = useCallback(() => {
    setMessageMenu((messageMenu) => ({
      ...messageMenu,
      open: false
    }));
  }, []);

  const handleClearAll = useCallback(() => {
    dispatch(clearAllMessage());
    handleMenuClose();
  }, [dispatch, handleMenuClose]);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap>导航</Typography>
          <div
            onClick={handleLogout}
            title={'登出'}
            className={classes.logoutWrapper}>
            <LockOpenIcon/>
          </div>
          <MessageBox setMessageMenu={setMessageMenu}/>
          <MemoMenu {...{handleMenuClose, messageMenu, handleClearAll}}/>
        </Toolbar>
      </AppBar>
      <MemoDraw open={open}/>
      <main className={classes.content}>
        {/*占位,防止被导航栏覆盖*/}
        <div className={classes.placeholder}/>
        <Router/>
      </main>
    </div>
  );
}, areEqual);

const MessageBox = React.memo(function MessageBox({setMessageMenu}) {
  const {message} = useSelector(selectMessage);
  const handleMenuClick = useCallback((e) => {
    if (message.length !== 0) {
      setMessageMenu({
        open: true,
        anchorEl: e.currentTarget
      });
    }
  }, [message.length, setMessageMenu]);
  return <ContextMessageBox messageLength={message.length} handleMenuClick={handleMenuClick}/>;
}, areEqual);


const ContextMessageBox = React.memo(function ContextMessageBox({messageLength, handleMenuClick}) {
  const classes = useStyles();
  return (
    <Badge
      title={messageLength === 0 ? '没有消息' : ''}
      onClick={handleMenuClick}
      className={classes.badge}
      badgeContent={messageLength}
      color="secondary"
    >
      <MailIcon/>
    </Badge>
  );
}, areEqual);


const MemoMenu = React.memo(function MemoMenu(props) {
  const {message} = useSelector(selectMessage);
  return <ContextMemoMenu {...{message, ...props}}/>;
}, areEqual);

const ContextMemoMenu = React.memo(function MemoMenu(props) {
  const {handleMenuClose, messageMenu, handleClearAll, message} = props;
  const classes = useStyles();
  const paperProps = {
    style: {
      minHeight: 100,
      maxHeight: 400,
      minWidth: 300,
      maxWidth: 350,
      overflow: 'scroll'
    },
  };
  return (
    <Menu
      id="long-menu"
      anchorEl={messageMenu.anchorEl}
      keepMounted
      open={messageMenu.open}
      onClose={handleMenuClose}
      PaperProps={paperProps}
    >
      <MenuItem onClick={handleClearAll}>
        清空全部
      </MenuItem>
      {message.map((msg) => (
        <MenuItem className={classes.fullWidth} key={msg.id} onClose={handleMenuClose}>
          <MemoAlert msg={msg} handleMenuClose={handleMenuClose}/>
        </MenuItem>
      ))}
    </Menu>
  );
}, areEqual);

// 单独提取成组件的原因:如果不提取,Alert组件中的handleDeleteMessage函数只能写成內联形式(需要传入id属性)
const MemoAlert = React.memo(function MemoAlert({msg, handleMenuClose}) {
  const {message} = useSelector(selectMessage);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleDeleteMessage = useCallback(() => {
    //这里不能把dispatch提出到外面
    if (message.length === 1) {
      dispatch(removeMessage(msg.id));
      handleMenuClose();
    } else {
      dispatch(removeMessage(msg.id));
    }
  }, [dispatch, handleMenuClose, message.length, msg.id]);

  return (
    <Alert
      onClose={handleDeleteMessage}
      className={classes.fullWidth}
      variant="filled" severity={msg.state}>
      {msg.message}/{msg.time}
    </Alert>
  );
}, areEqual);


const MemoDraw = React.memo(function MemoDraw({open}) {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      className={`${classes.drawer} ${open ? classes.drawerOpen : classes.drawerClose}`}
      classes={{paper: `${open ? classes.drawerOpen : classes.drawerClose}`}}
      open={open}
    >
      {/*占位 防止被导航栏覆盖*/}
      <div className={classes.placeholder}/>
      <List>
        {
          [
            {title: '主页', route: router.ADMIN, icon: <AssignmentIcon/>},
            {title: '标签', route: router.ADMIN_TAGS, icon: <LocalOfferIcon/>},
            {title: '图片', route: router.ADMIN_PIC, icon: <PermMediaIcon/>},
            {title: '用户', route: router.ADMIN_USER, icon: <FaceIcon/>},
            {title: '安全', route: router.ADMIN_SECURITY, icon: <SecurityIcon/>},
          ].map(item => (
            <ListItem key={item.title} title={item.title} button component={Link} to={item.route}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title}/>
            </ListItem>
          ))
        }
      </List>
    </Drawer>
  );
}, areEqual);

export default Nav;
