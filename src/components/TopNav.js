import React from "react";
import {AppBar, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/core/SvgIcon/SvgIcon";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      width: '100%',
      marginBottom: 40
    },
  },
}));

export default function TopNav() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={classes.menuButton}
        >
          <MenuIcon/>
        </IconButton>
        <Typography variant="h6" noWrap>
          ADMIN
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
