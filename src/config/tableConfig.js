import React, {forwardRef} from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

// 表格图标
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

//表格翻译
const localization = {
  body: {
    editRow: {
      deleteText: '确定要删除这一条吗?',
      cancelTooltip: '取消',
      saveTooltip: '保存'
    },
    addTooltip: '添加',
    deleteTooltip: '删除',
    editTooltip: '编辑',
    emptyDataSourceMessage: '没有搜索结果'
  },
  header: {
    actions: "操作"
  },
  toolbar: {
    searchTooltip: '搜索',
    searchPlaceholder: '搜索'
  },
  pagination: {
    labelRowsSelect: '条',
    firstTooltip: '第一页',
    previousTooltip: '上一页',
    lastTooltip: '最后一页',
    nextTooltip: '下一页',
    labelDisplayedRows: '{from}-{to} / {count}'
  },
};

const columns = [
  {title: '标题', field: 'title'},
  {title: '标签', field: 'tags', sorting: false},
  {title: '状态', field: 'state'},
  {title: '评论', field: 'comments'},
  {title: '修改日期', field: 'changeDate', type: 'datetime', editable: 'never'},
  {title: '创建日期', field: 'createDate', type: 'datetime'}
];

// 表格每页行数
const options = {pageSize: 5};

export {localization, tableIcons, columns, options};
