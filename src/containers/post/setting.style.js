import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
  container: {
    padding: 10,
    '& > *': {
      width: '100%',
      marginTop: 35
    }
  },
  drawerPaper: {
    width: drawerWidth,
    boxShadow: `
    rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, 
    rgba(0, 0, 0, 0.14) 0px 5px 8px 0px, 
    rgba(0, 0, 0, 0.12) 0px 1px 14px 0px
    `
  },
  placeholder: {
    height: 5
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  autoSave: (open) => ({
    display: open ? '' : 'none'
  })
}));
