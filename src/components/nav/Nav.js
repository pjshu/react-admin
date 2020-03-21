import React from 'react';
import {
  AppBar,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Router from './Router';
import {Link} from "react-router-dom";
import router from '../../contants/router';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import FaceIcon from '@material-ui/icons/Face';
import useStyles from './navStyle';
import SecurityIcon from '@material-ui/icons/Security';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {selectMessage, removeMessage, clearAllMessage} from "../../redux/globalSlice";


function Nav() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {message} = useSelector(selectMessage);
  const [open, setOpen] = React.useState(false);
  const [messageMenu, setMessageMenu] = React.useState({
    anchorEl: null,
    open: false,
  });
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleMenuClick = (e) => {
    if (message.length !== 0) {
      setMessageMenu({
        open: true,
        anchorEl: e.currentTarget
      });
    }
  };
  const handleMenuClose = () => {
    setMessageMenu({
      ...messageMenu,
      open: false
    });
  };
  const handleDeleteMessage = (id) => {
    //这里不能把dispatch提出到外面
    if (message.length === 1) {
      dispatch(removeMessage(id));
      handleMenuClose();
    } else {
      dispatch(removeMessage(id));
    }
  };
  const handleClearAll = () => {
    dispatch(clearAllMessage());
    handleMenuClose();
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
          <Badge
            title={message.length === 0 ? '没有消息' : ''}
            onClick={handleMenuClick}
            style={{
              position: "absolute",
              right: '40px'
            }}
            badgeContent={message.length}
            color="secondary"
          >
            <MailIcon/>
          </Badge>
          <Menu
            id="long-menu"
            anchorEl={messageMenu.anchorEl}
            keepMounted
            open={messageMenu.open}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                minHeight: 100,
                maxHeight: 400,
                minWidth: 300,
                maxWidth: 350,
                overflow:'scroll'
              },
            }}
          >
            <MenuItem onClick={handleClearAll}>
              清空全部
            </MenuItem>
            {message.map((msg) => (
              <MenuItem style={{
                width:'100%'
              }} key={msg.id} onClose={handleMenuClose}>
                <Alert onClose={() => handleDeleteMessage(msg.id)} style={{
                  width: '100%'
                }} variant="filled" severity={msg.state}>
                  {msg.message}/{msg.time}
                </Alert>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
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

      <main className={classes.content}>
        {/*占位,防止被导航栏覆盖*/}
        <div className={classes.placeholder}/>
        <Router/>
      </main>
    </div>
  );
}

export default Nav;
