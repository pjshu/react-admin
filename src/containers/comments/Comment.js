import React from 'react';
import {Container,} from "@material-ui/core";
import Table from "../../components/table";

function Comment({columns}) {
  const _api = React.useMemo(async () => {
    const {queryComment} = await import('../../helpers/api/security');
    return {
      query: queryComment,
      delete: (res) =>{
        console.log(res)
        return new Promise()
      },
    };
  }, []);

  return (
    <Container maxWidth={false}>
      <Table
        tableName={'评论'}
        columns={columns}
        api={_api}
      />
    </Container>
  );
}

export default Comment;
