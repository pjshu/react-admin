import React from "react";
import {Container, Fab, Grid, makeStyles} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import {addNewPost} from '../../helpers/http';
import router from '../../contants/router';
import Table from './Table';

const useStyles = makeStyles(theme => ({
  icon: {
    position: "fixed",
    zIndex: 6,
    right: 10,
    bottom: 10
  },
}));


export default function Posts({history}) {
  const classes = useStyles();
  return (
    <Container maxWidth={false}>
      <Grid
        className={classes.icon}
        title="写文章"
        onClick={handleOnClick}>
        <Fab color="primary" aria-label="edit">
          <EditIcon/>
        </Fab>
      </Grid>
      <Table {...{history}}/>
    </Container>
  );

  function handleOnClick() {
    addNewPost().then(res => {
      const {status, data} = res.data;
      if (status === 'success' && data) {
        history.push(`${router.ADMIN_POST}/${data.postId}?newPost=true`);
      }
    });
  }
}

