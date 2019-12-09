import React from "react";
import {Fab, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  icon: {
    position: "fixed",
    right: "20px",
  },

}));

export default function Article() {
  const classes = useStyles();
  const Route = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
  return (
    <Grid container direction="column" alignItems="center" spacing={4}>
      <Grid className={classes.icon} title="写文章" component={Route} to="/admin/write">
        <Fab color="primary" aria-label="edit">
          <AddIcon/>
        </Fab>
      </Grid>
      <Grid item>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3" align="center">
            article title
          </Typography>
        </Paper>
      </Grid>

      <Grid item>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3" align="center">
            article title
          </Typography>
        </Paper>
      </Grid>

      <Grid item>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3" align="center">
            article title
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
