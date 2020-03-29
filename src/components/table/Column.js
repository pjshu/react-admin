import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import {Checkbox} from "@material-ui/core";

const MemoEditorCell = React.memo(({handleEditor, row}) => {
  return (
    <div>
      <EditIcon onClick={() => {
        handleEditor(row);
      }}/>
    </div>
  );
});

const EditorColumn = () => ({
  id: 'editor',
  Header: '编辑',
  disableSortBy: true,
  width: 70,
  disableResizing: true,
  Cell: ({handleEditor, row}) => (
    <MemoEditorCell handleEditor={handleEditor} row={row}/>
  ),
});


const IndeterminateCheckbox = React.forwardRef(
  ({indeterminate, ...rest}, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    // TODO:
    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <Checkbox ref={resolvedRef} {...rest} />
      </>
    );
  }
);


const MemoCheckBoxCell = React.memo(({row}) => (
  <div>
    <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
  </div>
));

const MemoCheckBoxHeader = React.memo(({getToggleAllRowsSelectedProps}) => {
  return (
    <div>
      <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    </div>
  );
});

const CheckBoxColumn = (column) => ({
  id: 'selection',
  disableSortBy: true,
  width: 70,
  disableResizing: true,
  Header: ({getToggleAllRowsSelectedProps}) => (
    <MemoCheckBoxHeader getToggleAllRowsSelectedProps={getToggleAllRowsSelectedProps}/>
  ),
  Cell: ({row}) => (
    <MemoCheckBoxCell row={row}/>
  ),
});

export {EditorColumn, CheckBoxColumn};
