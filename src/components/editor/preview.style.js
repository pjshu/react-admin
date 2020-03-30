import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    zIndex: 4,
    left: '55%',
    top: '50%',
    transform: 'translate(-50%, -45%)'
  },
  paper: {
    width: 800,
    minHeight: 700,
    maxHeight: 900,
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: 16,
  },
  post: {
    whiteSpace: 'pre-wrap'
  },
  closeButton: {
    width: '100px',
    position: 'absolute',
    right: '20px',
    bottom: '20px'
  },
  emoji: {
    '& .braft-emoticon-wrap > img': {
      width: '20px'
    }
  },
  table: {
    '&  table': {
      tableLayout: 'fixed',
      width: '100%',
      borderCollapse: 'collapse',
      boxShadow: '0 0 0 1px #dfdfdf',
    },
    '&  td': {
      padding: '20px',
      letterSpacing: '1px',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        padding: '10px',
      },
    },
    '&  tr:nth-child(even) > td:nth-child(even)': {
      background: '#F6F8FC'
    },
    '&  tr:nth-child(odd) > td:nth-child(odd)': {
      background: '#F6F8FC'
    }
  },
}));
