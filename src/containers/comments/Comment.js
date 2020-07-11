import React, {useMemo} from 'react';
import {
  Container,
  Grid,
} from "@material-ui/core";
import useStyles from './Comment.style';
import getDate from './data';
import Table from "../../components/table";
import EditorDialog from "../tags/EditorDialog";

function Comment({columns}) {
  const classes = useStyles();
  const _api = React.useMemo(async () => {
    const {queryComment} = await import('../../helpers/api/security');
    return {
      query: queryComment,
    };
  }, []);

  return (
    <Container maxWidth={false}>
      <Table
        tableName={'评论'}
        columns={columns}
        api={getDate}
      />
    </Container>
  );
}

export default Comment;
