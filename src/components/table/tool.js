import {CheckBoxColumn, EditorColumn} from "./Column";
import {useCallback, useEffect, useMemo} from "react";

export const addColumns = (hooks, handleEditor, Columns) => {
  hooks.allColumns.push((columns) => {
    const res = [
      CheckBoxColumn(),
      ...Columns.map((item) => (
        item(columns)
      )),
      ...columns
    ];
    if (handleEditor) {
      res.splice(1, 0, EditorColumn());
    }
    return res;
  });
};

export const useUpdateHandler = (setData, setRowCount) => {
  return useCallback((value) => {
    let isNewData = true;
    //更新数据
    setData(old => {
      const newData = old.map(item => {
        if (item.id === value.id) {
          isNewData = false;
          return value;
        }
        return item;
      });
      //添加新的数据
      if (isNewData) {
        newData.push(value);
        setRowCount((rowCount) => rowCount + 1);
      }
      return newData;
    });
  }, [setData, setRowCount]);
};

export const removeByIndexs = (array, indexs, ids) => {
  return array.filter((item, i) => {
    if (indexs.includes(i)) {
      ids.push(item.id);
      return false;
    }
    return true;
  });
};

/**
 *query={
 * 'orderBy':[{field:'title',desc:true}]
 *'page':0,
 *'pageSize':10,
 *'search':'str',
 *'totalCount':1
 * }
 */
export const useGetQuery = ({sortBy, pageIndex, pageSize, globalFilter}) => {
  return useMemo(() => {
    const orderBy = sortBy.map(item => {
      return {field: item.id, desc: item.desc};
    });
    return {
      page: pageIndex,
      pageSize: pageSize,
      orderBy: orderBy.length !== 0 ? JSON.stringify(orderBy) : null,
      search: globalFilter
    };
  }, [globalFilter, sortBy, pageIndex, pageSize]);
};

export const useQuery = ({api, setData, setRowCount, query}) => {
  useEffect(() => {
    api.then((module) => {
      module.query(query).then(res => {
        const {data: {values, total}} = res;
        setData(values);
        setRowCount(total);
      });
    });
  }, [api, query, setData, setRowCount]);
};

export const useDeleteData = ({api, setData, setRowCount}) => {
  return useCallback((id_list, newData) => {
    api.then((module) => {
      module.delete({id_list}).then(res => {
        if (res.status === 'success') {
          setData(newData);
          setRowCount((rowCount) => rowCount - 1);
        }
      });
    });
  }, [api, setData, setRowCount]);
};


export const useDeleteHandler = ({selectedRowIds, deleteData, data}) => {
  return useCallback(() => {
    const id_list = [];
    const newData = removeByIndexs(
      data,
      Object.keys(selectedRowIds).map(x => parseInt(x, 10)),
      id_list
    );
    deleteData(id_list, newData);
  }, [data, deleteData, selectedRowIds]);
};
