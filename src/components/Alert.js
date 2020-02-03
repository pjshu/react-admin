import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

export default function Alert(msg) {
  const [state, setState] = React.useState(false);

  const handleClose = () => {
    setState(false);
  };

  return (
    <Snackbar
      open={state.open}
      onClose={handleClose}
      TransitionComponent={Fade}
      message={msg}
    />
  );
}
