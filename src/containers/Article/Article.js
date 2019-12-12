import React, {useEffect} from "react";
import {Divider, Fab, Grid, List, ListItem, ListItemText, makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import {useRequests} from "../../hook";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    position: "fixed",
    right: "20px",
  },

}));


export default function Article() {
  const classes = useStyles();
  const API = '/api/admin/posts';
  const data = useRequests(API);
  const Route = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
  return (
    <Grid container direction="column" alignItems="center" spacing={4}>
      <Grid className={classes.icon} title="写文章" component={Route} to="/admin/write">
        <Fab color="primary" aria-label="edit">
          <AddIcon/>
        </Fab>
      </Grid>
      <Grid className={classes.root}>
        <List>
          <ListItem button>
            <ListItemText primary="title1"/>
          </ListItem>
          <Divider/>
          <ListItem button>
            <ListItemText primary="title1"/>
          </ListItem>
          <Divider/>
          <ListItem button>
            <ListItemText primary="title1"/>
          </ListItem>
          <Divider/>
          <ListItem button>
            <ListItemText primary="title1"/>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

