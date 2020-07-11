import EditIcon from "@material-ui/icons/Edit";
import React, {useState, useEffect, useRef, useCallback} from "react";
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


const CheckBoxColumn = (column, props) => ({
  id: 'selection',
  disableSortBy: true,
  width: 70,
  disableResizing: true,

  Header: ({getToggleAllRowsSelectedProps}) => (
    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
  ),
  Cell: ({row}) => (
    <>
      {/*{console.log(row.getToggleRowSelectedProps())}*/}
      {/*{console.log(row.id)}*/}
      {/*{console.log(props.instance.state.selectedRowIds)}*/}
      <IndeterminateCheckbox
        {...row.getToggleRowSelectedProps()}
        // checked={props.instance.state.selectedRowIds[row.id]}
      />
    </>
  ),
});

export {EditorColumn, CheckBoxColumn};


`
function onChange(e) {
        row.toggleRowSelected(e.target.checked);
      }
`;
