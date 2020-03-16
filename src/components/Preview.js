import React from 'react';
import {Route} from "react-router-dom";

function Preview({state}) {
  return (
    <Route path={'/admin/post/preview/1'} exact>
      <div style={{maxWidth: '100%'}} dangerouslySetInnerHTML={{__html: state}}/>
    </Route>
  );
}

export default Preview;
