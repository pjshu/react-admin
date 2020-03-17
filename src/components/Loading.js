import React, {useState} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {Grid} from "@material-ui/core";

function Loading() {

  return (
    <Grid style={{height: '100%'}} container justify={"center"} alignItems={"center"}>
      <CircularProgress/>
    </Grid>
  );
}

export default Loading;

function AsyncLoading(props) {
  const [loading, setLoading] = useState(true);
  return loading ? <Loading/> : props.render(setLoading);
}

export {AsyncLoading};
