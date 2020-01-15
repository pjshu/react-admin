import React from "react";
import {Divider, Fab, Grid, List, ListItem, ListItemText, makeStyles} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
// import {useRequests} from "../../hook";
import api from '../../contants/api';
import http from '../../misc/http';
import router from '../../contants/router';

const useStyles = makeStyles(theme => ({
  list: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    position: "fixed",
    zIndex: 6,
    right: "20px",
  },
}));


export default function Article(props) {
  const {setTimeStamp, history} = props;
  const classes = useStyles();
  // const API = '/api/admin/posts';
  // const data = useRequests(API);
  return (
    <Grid container direction="column" alignItems="center">
      <Grid
        className={classes.icon}
        title="写文章"
        onClick={handleOnClick}>
        <Fab color="primary" aria-label="edit">
          <AddIcon/>
        </Fab>
      </Grid>
      <Grid className={classes.list}>
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

  function handleOnClick() {
    const timeStamp = new Date() * 1;
    setTimeStamp(timeStamp);
    http.post(api.posts, {timeStamp}).then(res => {
      if (res.data.status === 'success') {
        history.push(router.ADMIN_WRITE);
      }
    });
  }
}

