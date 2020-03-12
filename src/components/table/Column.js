import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import {Checkbox} from "@material-ui/core";

const EditorColumn = () => ({
  id: 'editor',
  Header: '编辑',
  disableSortBy: true,
  width: 70,
  disableResizing: true,
  Cell: ({handleEditor, row}) => (
    <div>
      <EditIcon onClick={() => {
        handleEditor();
        console.log(row);
      }}/>
    </div>
  ),
});


const IndeterminateCheckbox = React.forwardRef(
  ({indeterminate, ...rest}, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

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
    <div>
      <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    </div>
  ),
  Cell: ({row}) => (
    <div>
      <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    </div>
  ),
});

export {EditorColumn, CheckBoxColumn}
