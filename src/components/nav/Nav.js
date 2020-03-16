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
  makeStyles,
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
import styles from './navStyle';
import SecurityIcon from '@material-ui/icons/Security';

const useStyles = makeStyles(theme => styles(theme));

function Nav() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(!open);
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
