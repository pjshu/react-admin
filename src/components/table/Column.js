import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import {Checkbox} from "@material-ui/core";

const MemoEditorCell = React.memo(({handleEditor, row}) => {
  const handleOnClick = React.useCallback(() => {
    handleEditor(row);
  }, [handleEditor, row]);

  return (
    <div>
      <EditIcon onClick={handleOnClick}/>
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


const CheckBoxColumn = (column) => ({
  id: 'selection',
  disableSortBy: true,
  width: 70,
  disableResizing: true,
  Header: ({getToggleAllRowsSelectedProps}) => (
    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
  ),
  Cell: ({row}) => (
    <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
  ),
});

export {EditorColumn, CheckBoxColumn};
