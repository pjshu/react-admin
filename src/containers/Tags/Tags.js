import React from 'react';
import MaterialTable from 'material-table';
import {Container} from "@material-ui/core";
import {localization, options, tableIcons, tagColumns} from "../../config/tableConfig";
import api from "../../helpers/http";

export default function Tags() {
  // TODO: 数据没加载时,加载动画
  function handleOnDelete(oldRow) {
    return new Promise(resolve => {
      const postId = oldRow.postId;
      api.deleteTag({data: {postId}}).then(res => {
        if (res.data.status === 'success') {
          resolve();
        }
      });
    });
  }

  function handleRowUpdate(newRow) {
    return new Promise(resolve => {
      return api.modifyTag({data: newRow}).then(res => {
        if (res.status === 'success') {
          resolve();
        }
      });
    });
  }

  function handleOnAdd(newRow) {
    return new Promise(resolve => {
      return api.addTag({data: newRow}).then(res => {
        if (res.data.status === 'success') {
          resolve();
        }
      });
    });
  }

  function handlePagingQuery(query) {
    return new Promise((resolve) => {
      api.getTags({params: query}).then(res => {
        const data = res.data;
        resolve({
          data: [...data.tags],
          page: data.page,
          totalCount: data.total
        });
      });
    });
  }

  return (
    <Container maxWidth={false}>
      <MaterialTable
        localization={localization}
        icons={tableIcons}
        title="标签列表"
        columns={tagColumns}
        data={handlePagingQuery}
        options={options}
        onChangeRowsPerPage={(size) => {
          console.log(size);
        }}
        editable={{
          onRowUpdate: handleRowUpdate,
          onRowDelete: handleOnDelete,
          onRowAdd: handleOnAdd
        }}
      />
    </Container>
  );
}
