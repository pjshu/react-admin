import React from "react";
import {Fab, Grid, makeStyles} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
// import {useRequests} from "../../hook";
import {newPost} from '../../helpers/http';
import router from '../../contants/router';
import Table from './Table';
import getCurrentTime from "../../helpers/datetime";

const useStyles = makeStyles(theme => ({
  list: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    position: "fixed",
    zIndex: 6,
    right: 10,
    bottom: 10
  },
}));


export default function Article(props) {
  const {setCurrentTime, history} = props;
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
        <Table {...{history}}/>
      </Grid>
    </Grid>
  );

  function handleOnClick() {
    const currentTime = getCurrentTime();
    setCurrentTime(currentTime);
    newPost(currentTime).then(res => {
      if (res.data.status === 'success') {
        history.push(router.ADMIN_WRITE);
      }
    });
  }
}

