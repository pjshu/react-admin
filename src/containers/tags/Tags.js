import React from 'react';
import {Container} from "@material-ui/core";
import Table from '../../components/table';
import EditorDialog from './EditorDialog';
import {
  addTag,
  closeDialog as _closeDialog,
  initDialog,
  selectTag,
  setDialogAsUpdate,
  setTagValue,
} from '../../redux/tagSlice';
import api from '../../helpers/http';
import {useDispatch, useSelector} from "react-redux";

export default function Tags({columns}) {
  const dispatch = useDispatch();
  const {initial, dialogState} = useSelector(selectTag);

  // 表格"+" 按钮
  const handleAddRow = React.useCallback(() => {
    dispatch(initDialog());
    dispatch(addTag());
  }, [dispatch]);

  // 表单编辑按钮
  const handleEditor = React.useCallback(({original}) => {
    dispatch(setTagValue(original));
    dispatch(setDialogAsUpdate());
  }, [dispatch]);

  const closeDialog = React.useCallback((state = 'add') => {
    dispatch(_closeDialog(state));
  }, [dispatch]);

  const _api = React.useMemo(() => ({
    query: api.queryTags,
    delete: api.deleteTag,
    modify: api.modifyTag,
  }), []);

  return (
    <Container maxWidth={false}>
      <Table
        tableName={'标签'}
        renderDialog={(updateHandler) => (
          <EditorDialog {...{
            updateHandler,
            dialogInit: initial,
            dialogState,
            closeDialog,
          }}/>)
        }
        handleAddRow={handleAddRow}
        handleEditor={handleEditor}
        columns={columns}
        api={_api}/>
    </Container>
  );
}
