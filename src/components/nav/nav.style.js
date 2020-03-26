import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 150;

export default makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  placeholder: {
    height: theme.spacing(10)
  },
  logoutWrapper: {
    zIndex: 2,
    position: "absolute",
    right: '100px',
    display: 'flex',
    alignItems: 'center'
  },
  badge: {
    position: "absolute",
    right: '40px'
  },
  fullWidth: {
    width: '100%'
  }
}));
