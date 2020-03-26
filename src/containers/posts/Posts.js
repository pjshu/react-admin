import React from "react";
import {Container, Fab, Grid} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Table from './Table';
import useStyles from './posts.style';
import {useDispatch} from "react-redux";
import {addPost} from '../../redux/postSlice';


export default function Posts() {
  const classes = useStyles();
  const dispatch = useDispatch();
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
    dispatch(addPost());
  }
}

