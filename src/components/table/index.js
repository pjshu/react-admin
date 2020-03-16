import React from 'react';

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
    tableName
  } = props;
  // Column为数组,数组元素为column实例(如./Column),用于添加不需要react-table数据渲染的列
  const [data, setData] = React.useState([]);
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    // setSkipPageReset(true);
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
  };
  return (
    <div>
      <CssBaseline/>
      <EnhancedTable
        columns={columns}
        data={data}
        Columns={Columns}
        setData={setData}
        updateMyData={updateMyData}
        api={api}
        handleAddRow={handleAddRow}
        renderDialog={renderDialog}
        handleEditor={handleEditor}
        tableName={tableName}
      />
    </div>
  );
};

export default Table;
