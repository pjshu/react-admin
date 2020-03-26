import {makeStyles} from "@material-ui/core/styles";

export default makeStyles({
  root: {
    position: 'absolute',
    zIndex: 2,
    left: '55%',
    top: '52%',
    transform: 'translate(-50%, -50%)'
  },
  preButton: {
    zIndex: 2,
    position: 'absolute',
    top: '50%',
    left: '-40px',
    transform: 'translateX(-50%)',
    '& > svg': {
      fontSize: '60px',
    }
  },
  nextButton: {
    zIndex: 2,
    position: 'absolute',
    top: '50%',
    right: '-95px',
    transform: 'translateX(-50%)',
    '& > svg': {
      fontSize: '60px',
    }
  },
  imgWrapper: {
    padding: 10,
    width: 700,
    maxHeight: 800,
    '& > img': {
      maxWidth: 680,
      maxHeight: 370
    }
  },
  buttonGroup: {
    marginTop: '10px',
    '& > button': {
      border: '0'
    }
  },
  describe: {
    width: 680
  },
  actionBtn: {
    '&> *': {
      position: 'absolute',
      bottom: 20,
      zIndex: 2
    },
    '& > :first-child': {
      right: 20,
    },
    '& > :nth-child(2)': {
      right: 80,
    },
    '& > :last-child': {
      right: 140,
    }
  }
});
