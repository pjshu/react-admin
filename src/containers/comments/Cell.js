import React from "react";
import useStyles from './Cell.style';

export function Content({row}) {
  const classes = useStyles();
  return (
    <textarea
      className={classes.content}
      readOnly={true}
      value={row.original.content}
    />
  );
}

export function Extend({row}) {
  return row.canExpand ? (
    <span
      {...row.getToggleRowExpandedProps({
        style: {
          // We can even use the row.depth property
          // and paddingLeft to indicate the depth
          // of the row
          paddingLeft: `${row.depth * 2}rem`,
        },
      })}
    >
              {row.isExpanded ? '收起' : '展开'}
            </span>
  ) : null;
}

export function ExtendHeader(props) {
  const {getToggleAllRowsExpandedProps, isAllRowsExpanded} = props;
  return (
    <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? '收起' : '展开'}
    </span>
  );
}
