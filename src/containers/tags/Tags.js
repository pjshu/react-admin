import React from 'react';
import {Container} from "@material-ui/core";
import api from "../../helpers/http";
import Table from '../../components/table';
import EditorDialog from './EditorDialog';


export default function Tags({columns}) {
  const [dialogInit, setDialogInit] = React.useState({
    name: '',
    describe: '',
    count: 0,
  });
  const initDialog = () => {
    setDialogInit(dialogInit);
  };

  const [dialogState, setDialogState] = React.useState({
    open: false,
    action: 'add' //add 或者 update
  });

  const handleAddRow = () => {
    setDialogState({
      action: 'add',
      open: true
    });
  };

  const handleEditor = () => {
    setDialogState({
      action: 'update',
      open: true
    });
  };

  const closeDialog = (state = 'add') => {
    setDialogState({
      action: state,
      open: false
    });
  };

  return (
    <Container maxWidth={false}>
      <Table
        renderDialog={(props) => <EditorDialog {...{props, dialogInit, initDialog, dialogState, closeDialog}}/>}
        dialogInit={dialogInit}
        setDialogInit={setDialogInit}
        handleAddRow={handleAddRow}
        handleEditor={handleEditor}
        columns={columns}
        api={{
          query: api.queryTags,
          delete: api.deleteTag,
          modify: api.modifyTag,
        }}/>
    </Container>
  );
}
