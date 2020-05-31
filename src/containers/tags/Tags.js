import React, {useCallback} from 'react';
import {Container} from "@material-ui/core";
import Table from '../../components/table';
import EditorDialog from './EditorDialog';
import {
  addTag,
  setDialogAsUpdate,
} from '../../redux/tagSlice';
import {useDispatch} from "react-redux";
import {areEqual} from "../../helpers/misc";
import {changeFormField, initTagForm} from "../../redux/formSlice";
import FORM from "../../contants/form.json";

function Tags({columns}) {
  const dispatch = useDispatch();

  // 表格"+" 按钮
  const handleAddRow = useCallback(() => {
    dispatch(initTagForm());
    dispatch(addTag());
  }, [dispatch]);

  // 表单编辑按钮
  const handleEditor = useCallback(({original}) => {
    dispatch(changeFormField({form: FORM.tags, ...original}));
    dispatch(setDialogAsUpdate());
  }, [dispatch]);

  const _api = React.useMemo(async () => {
    const {modifyTag, deleteTag, queryTags} = await import('../../helpers/api/security');
    return {
      query: queryTags,
      delete: deleteTag,
      modify: modifyTag
    };
  }, []);

  return (
    <Container maxWidth={false}>
      <Table
        tableName={'标签'}
        renderDialog={(updateHandler) => (
          <EditorDialog {...{updateHandler}}/>)
        }
        handleAddRow={handleAddRow}
        handleEditor={handleEditor}
        columns={columns}
        api={_api}/>
    </Container>
  );
}

export default React.memo(Tags, areEqual);
