import React from "react";
import {Fab, Grid, makeStyles} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
// import {useRequests} from "../../hook";
import {newPost} from '../../helpers/http';
import router from '../../contants/router';
import Table from './Table';

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


export default function Article({history}) {
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
    newPost().then(res => {
      const {status, data} = res.data;
      if (status === 'success' && data) {
        history.push(`${router.ADMIN_POST}/${data.postId}?newPost=true`);
      }
    });
  }
}

