import React from 'react';
import {Container} from "@material-ui/core";
import api from "../../helpers/http";
import Table from '../../components/table';
import EditorDialog from './EditorDialog';
import {
  initDialog as _initDialog, addTag, setTagValue,
  setDialogAsUpdate, closeDialog as _closeDialog, selectTag
} from '../../redux/tagSlice';
import {useDispatch, useSelector} from "react-redux";

export default function Tags({columns}) {
  const dispatch = useDispatch();
  const {initial, dialogState} = useSelector(selectTag);

  const initDialog = () => {
    dispatch(_initDialog());
  };

  // 添加按钮事件
  const handleAddRow = () => {
    initDialog();
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
