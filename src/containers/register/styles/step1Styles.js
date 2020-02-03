const styles = {
  name: {
    '& > *': {
      width: '45%',
      '& > :nth-child(2)': {
        height: 30,
        position: 'fixed',
        background: '#fff'
      }
    },
  },
  password: {
    marginTop: 70,
    marginBottom: 40,
    '& > *': {
      width: '45%',
      '& > :nth-child(2)': {
        height: 30,
        position: 'fixed',
        background: '#fff'
      }
    }
  }
};
export default styles;
