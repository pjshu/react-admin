import React from "react";
import {Container, Fab, Grid, makeStyles} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Table from './Table';
import styles from './styles/postsStyles';
import {useDispatch} from "react-redux";
import {addPost} from '../../redux/postSlice';

const useStyles = makeStyles(theme => styles(theme));


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

