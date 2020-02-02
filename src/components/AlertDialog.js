import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


function AlertDialog({alertMessage}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    if (!!alertMessage) {
      setDialogOpen(true);
    }
  }, [alertMessage]);
  return (
    <Dialog open={dialogOpen}>
      <DialogContent
        style={{
          width: 200,
          height: 70,
          paddingBottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          margin: 0
        }}>
        <DialogContentText children={{margin: 0}}>
          {alertMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{paddingTop: 0}}>
        <Button onClick={() => setDialogOpen(false)} color="primary">
          确认
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
