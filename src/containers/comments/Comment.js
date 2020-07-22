import React, {useCallback} from 'react';
import {Container,} from "@material-ui/core";
import Table from "../../components/table";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const CheckColumn = () => ({
  id: 'check',
  Header: '审核',
  disableSortBy: true,
  width: 70,
  disableResizing: true,
  Cell: ({row, updateMyData}) => {
    const handleOnClick = useCallback(async () => {
      const {changeComments} = await import('../../helpers/api/security');
      changeComments({show: !row.original.show}, row.original.id).then(res => {
        if (res.status === 'success') {
          updateMyData(row.index, {'show': !row.original.show});
        }
      });
    }, [row.index, row.original.show, updateMyData]);
    return (
      <div
        onClick={handleOnClick}
        title={row.original.show ? '隐藏' : '显示'}
      >
        {
          row.original.show ? (
            <CloseIcon/>
          ) : (
            <CheckIcon/>
          )
        }
      </div>
    );
  },
});

function Comment({columns}) {
  const _api = React.useMemo(async () => {
    const {queryComment, deleteComments} = await import('../../helpers/api/security');
    return {
      query: queryComment,
      delete: deleteComments
    };
  }, []);

  return (
    <Container maxWidth={false}>
      <Table
        tableName={'评论'}
        columns={columns}
        api={_api}
        Columns={[CheckColumn]}
      />
    </Container>
  );
}

export default Comment;
