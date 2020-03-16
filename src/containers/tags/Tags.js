import React from 'react';
import {Container} from "@material-ui/core";
import api from "../../helpers/http";
import Table from '../../components/table';
import EditorDialog from './EditorDialog';
import AlertMessage from "../../components/AlertMessage";

export default function Tags({columns}) {
  const initial = React.useRef({
    id: -1,
    name: '',
    describe: '',
    count: 0,
    image: {
      name: '',
      url: ''
    }
  });
  const [dialogInit, setDialogInit] = React.useState(initial.current);

  const initDialog = () => {
    setDialogInit(dialogInit);
  };

  const [dialogState, setDialogState] = React.useState({
    open: false,
    action: 'add' //add 或者 update
  });

  // 添加按钮事件
  const handleAddRow = () => {
    api.addTag().then(res => {
      const {data, status} = res;
      if (status === 'success') {
        setDialogInit({...initial.current, id: data.id});
        setDialogState({
          action: 'add',
          open: true
        });
      } else {
        AlertMessage.failed('');
      }
    });
  };

  const handleEditor = ({original}) => {
    setDialogInit(original);
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
        tableName={'标签'}
        renderDialog={(updateHandler) => (
          <EditorDialog {...{
            updateHandler,
            dialogInit,
            dialogState,
            initDialog,
            closeDialog,
          }}/>)
        }
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
