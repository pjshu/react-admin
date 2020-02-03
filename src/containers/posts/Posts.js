import React, {useState} from "react";
import {Container, Fab, Grid, makeStyles} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import api from '../../helpers/http';
import Table from './Table';
import {toPost} from "../../history";
import AlertDialog from "../../components/AlertDialog";
import styles from './styles/postsStyles';

const useStyles = makeStyles(theme => styles(theme));


export default function Posts() {
  const classes = useStyles();
  const [alertMessage, setAlertMessage] = useState('');
  return (
    <Container maxWidth={false}>
      <AlertDialog {...{alertMessage}}/>
      <Grid
        className={classes.icon}
        title="写文章"
        onClick={handleOnClick}>
        <Fab color="primary" aria-label="edit">
          <EditIcon/>
        </Fab>
      </Grid>
      <Table {...{setAlertMessage}}/>
    </Container>
  );

  function handleOnClick() {
    api.addPost().then(res => {
      const {status, data} = res;
      if (status === 'success' && data && data.postId) {
        toPost(data.postId);
      }
    });
  }
}

