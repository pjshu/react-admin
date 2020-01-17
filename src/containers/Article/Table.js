import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import {columns, localization, options, tableIcons} from "../../config/tableConfig";
import {requirePosts} from "../../helpers/http";
import router from '../../contants/router'

export default function Tables({history}) {
  // TODO: 数据没加载时,加载动画
  useEffect(() => {
    requirePosts().then(res => {
      setData(res.data.data);
    }).catch(error => {
      console.log(error);
    });
    console.log('get data from server&& init state');
  }, []);
  const [data, setData] = React.useState([]);

  return (
    <MaterialTable
      localization={localization}
      icons={tableIcons}
      title="文章列表"
      columns={columns}
      data={data}
      options={options}
      onChangeRowsPerPage={(size) => {
        console.log(size);
      }}
      onRowClick={(_, post) => {
        history.push(`${router.ADMIN_POST}/${post.id}`);
      }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setData(prevState => {
                  const data = [...prevState];
                  data[data.indexOf(oldData)] = newData;
                  return [...data];
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setData(prevData => {
                const data = [...prevData];
                data.splice(data.indexOf(oldData), 1);
                return [...data];
              });
            }, 600);
          }),
      }}
    />
  );
}
