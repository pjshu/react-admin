import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import {Container} from "@material-ui/core";
import {localization, options, tableIcons, tagColumns} from "../../config/tableConfig";
import {deleteTag, modifyTag, requireTags} from "../../helpers/http";

export default function Tags() {
  // TODO: 数据没加载时,加载动画
  useEffect(() => {
    requireTags().then(res => {
      console.log(res);
      setTags(res.data.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);
  const [tags, setTags] = React.useState([]);

  function handleOnDelete(oldTag) {
    return deleteTag(oldTag.tagId).then(res => {
      if (res.data.status === 'success') {
        setTags(prevPost => {
          const data = [...prevPost];
          data.splice(data.indexOf(oldTag), 1);
          return [...data];
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }

  function handleOnChange(newTag, oldTag) {
    const data = {...newTag};
    return modifyTag(data).then(res => {
      console.log(res);
      if (res.data.status === 'success') {
        setTags(prevTag => {
          const data = [...prevTag];
          data[data.indexOf(oldTag)] = newTag;
          return [...data];
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <Container maxWidth={false}>
      <MaterialTable
        localization={localization}
        icons={tableIcons}
        title="标签列表"
        columns={tagColumns}
        data={tags}
        options={options}
        onChangeRowsPerPage={(size) => {
          console.log(size);
        }}
        editable={{
          onRowUpdate: handleOnChange,
          onRowDelete: handleOnDelete
        }}
      />
    </Container>
  );
}
