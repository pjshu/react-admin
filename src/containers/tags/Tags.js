import React from 'react';
import {Container} from "@material-ui/core";
import api from "../../helpers/http";
import Table from '../../components/table';
import EditorDialog from './EditorDialog';
import {
  addTag, setTagValue, initDialog, selectTag,
  setDialogAsUpdate, closeDialog as _closeDialog,
} from '../../redux/tagSlice';
import {useDispatch, useSelector} from "react-redux";

export default function Tags({columns}) {
  const dispatch = useDispatch();
  const {initial, dialogState} = useSelector(selectTag);

  // 添加按钮事件
  const handleAddRow = () => {
    dispatch(initDialog());
    dispatch(addTag());
  };

  const handleEditor = ({original}) => {
    dispatch(setTagValue(original));
    dispatch(setDialogAsUpdate());
  };

  const closeDialog = (state = 'add') => {
    dispatch(_closeDialog(state));
  };

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
        api={{
          query: api.queryTags,
          delete: api.deleteTag,
          modify: api.modifyTag,
        }}/>
    </Container>
  );
}
