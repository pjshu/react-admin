import {makeStyles} from "@material-ui/core/styles";
import 'braft-editor/dist/output.css';


export default makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    zIndex: 1202,
    left: '55%',
    top: '50%',
    transform: 'translate(-50%, -45%)',
    display: (modalOpen) => modalOpen ? '' : 'none'
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
    whiteSpace: 'pre-wrap',
    '& blockquote': {
      margin: '0 0 10px',
      padding: '15px 20px',
      backgroundColor: '#f1f2f3',
      borderLeft: '5px solid #ccc',
      color: '#666',
      fontStyle: 'italic'
    }
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
