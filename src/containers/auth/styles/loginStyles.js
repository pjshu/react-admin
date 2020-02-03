const loginStyles = () => ({
  container: {
    height: '100%'
  },
  paper: {
    width: 500,
    height: 350,
    padding: 20
  },
  form: {
    width: 420,
  },
  submit: {
    marginTop: 40
  },
  field: {
    '& > :nth-child(2)': {
      marginTop: '35px'
    },
    '& > * > :nth-child(2)': {
      height: 30,
      background: '#fff',
      position: 'fixed'
    }
  }
});

export default loginStyles;
