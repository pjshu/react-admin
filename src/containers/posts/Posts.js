import React from "react";
import {Container, Fab, Grid, makeStyles} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import api from '../../helpers/http';
import Table from './Table';
import {toPost} from "../../history";
import styles from './styles/postsStyles';

const useStyles = makeStyles(theme => styles(theme));


export default function Posts() {
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
      <Table/>
    </Container>
  );

  function handleOnClick() {
    api.addPost().then(res => {
      const {status, data} = res;
      if (status === 'success' && data.id) {
        toPost(data.id);
      }
    });
  }
}

