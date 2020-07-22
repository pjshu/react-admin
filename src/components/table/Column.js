import EditIcon from "@material-ui/icons/Edit";
import React, {useEffect, useRef, useCallback} from "react";
import {Checkbox} from "@material-ui/core";

const EditorColumn = () => ({
  id: 'editor',
  Header: '编辑',
  disableSortBy: true,
  width: 70,
  disableResizing: true,
  Cell: ({handleEditor, row}) => {

    const handleOnClick = useCallback(() => {
      handleEditor(row);
    }, [handleEditor, row]);

    return (
      <div>
        <EditIcon onClick={handleOnClick}/>
      </div>
    );
  },
});


const IndeterminateCheckbox = React.forwardRef(
  ({indeterminate, ...rest}, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;
    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <Checkbox ref={resolvedRef} {...rest} checked={rest.checked}/>
    );
  }
);


const CheckBoxColumn = () => ({
  id: 'selection',
  disableSortBy: true,
  width: 70,
  disableResizing: true,

  Header: ({getToggleAllRowsSelectedProps}) => (
    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
  ),
  Cell: ({row}) => (
    <IndeterminateCheckbox
      {...row.getToggleRowSelectedProps()}
    />
  ),
});

export {EditorColumn, CheckBoxColumn};
