import React, {useCallback, useState} from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import EnhancedTable from './Table';


const Table = (props) => {
  const {
    renderDialog,
    columns,
    api,
    Columns = [],
    handleAddRow,
    handleEditor,
    tableName,
  } = props;
  // Column为数组,数组元素为column实例(如./Column),用于添加不需要react-table数据渲染的列
  //handleAddR用于处理 + 号按钮行为
  // handleEditor 处理编辑行为
  // api 包括删除,更新,添加三🛎种api
  const [data, setData] = useState([]);

  const updateMyData = useCallback((rowIndex, columnId, value) => {
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  }, []);

  return (
    <div>
      <CssBaseline/>
      <EnhancedTable
        {...{
          columns,
          data,
          Columns,
          setData,
          updateMyData,
          api,
          handleAddRow,
          renderDialog,
          handleEditor,
          tableName,
        }}
      />
    </div>
  );
};

export default React.memo(Table, (pre, next) => {
  console.log(pre,'table');
  return true;
});
