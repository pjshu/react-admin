import React from 'react';
import Modal from '@material-ui/core/Modal';
import {
  Button,
  makeStyles,
  Card,
  Box,
  Paper,
  Grid,
  Typography,
  CardMedia,
  CardActionArea,
  TextField
} from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    width: 345,
    height: 160
    // minWidth:300,
    // maxWidth: 345,
  },
  media: {
    height: 160,
  },
});
const MyCard = ({image, ...rest}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} {...rest}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
      </CardActionArea>
    </Card>
  );
};

const CardModal = ({modalOpen, setModalOpen, image}) => {
  const handleOnClose = () => {
    setModalOpen(false);
  };
  return (
    <div style={{
      display: modalOpen ? '' : 'none',
      position: 'absolute',
      zIndex: '100',
      left: '50%',
      top: '55%',
      transform: 'translate(-50%, -50%)'
    }}>
      <Box style={{
        padding: 10,
        width: 700,
        height: 800,
      }} boxShadow={5} component={Paper}>
        <img style={{
          maxWidth: 680,
          maxHeight: 370
        }} src={image} alt=""/>
        <Grid container direction={'column'} alignItems={'center'} spacing={4}>
          <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              链接: 12312312312312312
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              使用列表(8)
              文章:文章名
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              style={{
                width: 680
              }}
              id="outlined-multiline-static"
              label="描述"
              multiline
              rows="8"
              defaultValue="Default Value"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Button style={{
          position: 'absolute',
          right: 20,
          bottom: 20
        }} color="primary" onClick={handleOnClose}
        >
          关闭
        </Button>
      </Box>
    </div>
  );
};

export default function MediaCard(props) {
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <>
      <CardModal {...{...props, modalOpen, setModalOpen}}/>
      <MyCard {...props} onClick={(e) => {
        e.preventDefault();
        console.log(e);
        setModalOpen(true);
      }}/>
    </>
  );
}
