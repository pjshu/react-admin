import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
  container: {
    padding: 10,
    '& > *': {
      width: '100%',
      marginTop: 40
    }
  },
  drawerPaper: {
    width: drawerWidth,
  },
  placeholder: {
    height: 5
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  autoSave: (open) => ({
    display: open ? '' : 'none'
  })
}));
