import React from 'react';
import MaterialTable from 'material-table';
import {Container} from "@material-ui/core";
import {localization, options, tableIcons, tagColumns} from "../../config/tableConfig";
import {addNewTag, deleteTag, modifyTag, requireTags} from "../../helpers/http";

export default function Tags() {
  // TODO: 数据没加载时,加载动画
  function handleOnDelete(oldRow) {
    return new Promise(resolve => {
      deleteTag(oldRow.postId).then(res => {
        if (res.data.status === 'success') {
          resolve();
        }
      }).catch(error => {
        console.log(error);
      });
    });
  }

  function handleRowUpdate(newRow) {
    return new Promise(resolve => {
      return modifyTag(newRow).then(res => {
        if (res.data.status === 'success') {
          resolve();
        }
      }).catch(error => {
        console.log(error);
      });
    });
  }

  function handleOnAdd(newRow) {
    return new Promise(resolve => {
      return addNewTag(newRow).then(res => {
        if (res.data.status === 'success') {
          resolve();
        }
      }).catch(error => {
        console.log(error);
      });
    });
  }

  function handlePagingQuery(query) {
    return new Promise((resolve) => {
      requireTags(query).then(res => {
        const data = res.data.data;
        resolve({
          data: [...data.tags],
          page: data.page,
          totalCount: data.total
        });
      }).catch(error => {
        console.log(error);
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
