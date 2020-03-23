import React from 'react';
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
import {api as API} from '../../helpers/http';
import api from '../../helpers/http';

const useStyles = makeStyles({
  root: {
    padding: 10,
    width: 345,
    height: 180
    // minWidth:300,
    // maxWidth: 345,
  },
  media: {
    height: 160,
  },
});
const MyCard = ({url, ...rest}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} {...rest}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={url}
          title="点击查看详情"
        />
      </CardActionArea>
    </Card>
  );
};

const CardModal = (props) => {
  const {count, id, modalOpen, setModalOpen, url, relationship, describe} = props;
  const [cacheDescribe, setCacheDescribe] = React.useState(describe);
  const handleOnClose = () => {
    setModalOpen(false);
  };
  return (
    <div style={{
      display: modalOpen ? '' : 'none',
      position: 'absolute',
      zIndex: '100',
      left: '50%',
      top: '50%',
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
        }} src={url} alt=""/>
        <Grid container direction={'column'} alignItems={'center'} spacing={4}>
          <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              链接: {url}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              使用列表({count})
              {
                relationship.map(item => (
                  <span>{item.type}:{item.name};</span>
                ))
              }
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
              variant="outlined"
              value={cacheDescribe}
              onChange={(e) => {
                setCacheDescribe(e.target.value);
              }}
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
        <Button style={{
          position: 'absolute',
          right: 80,
          bottom: 20
        }} color="primary" onClick={e => {
          api.deleteImage({id_list: [id]}).then(res => {

          });
        }}
        >
          删除
        </Button>
      </Box>
    </div>
  );
};

export default function MediaCard({url, ...props}) {
  const [modalOpen, setModalOpen] = React.useState(false);
  url = API.baseImage + url;
  return (
    <>
      <CardModal {...{...props, url, modalOpen, setModalOpen}}/>
      <MyCard {...{...props, url}} onClick={(e) => {
        e.preventDefault();
        setModalOpen(true);
      }}/>
    </>
  );
}
