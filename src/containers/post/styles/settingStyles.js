const drawerWidth = 240;

const styles = (theme) => ({
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
});
export default styles;
