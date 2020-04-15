import React, {useCallback} from 'react';
import {Box, Button, Card, CardActionArea, CardActions, CardMedia} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import useStyles from './card.style';
import {useDispatch} from "react-redux";
import {setClickCardId, openCardModal} from '../../redux/imageSlice';

const MyCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    image: {url},
    upload,
    id,
    handleDelete,
    uploadImage,
  } = props;

  const handleOnDelete = useCallback(() => {
    handleDelete(upload, id);
  }, [handleDelete, id, upload]);

  const handleUpdate = useCallback(() => {
    uploadImage(url, id);
  }, [id, uploadImage, url]);

  const handleOnClick = useCallback(() => {
    dispatch(setClickCardId(id));
    dispatch(openCardModal());
  }, [dispatch, id]);

  return (
    <Card component={Box} boxShadow={5} className={classes.root}>
      <CardActionArea onClick={handleOnClick}>
        <CardMedia
          className={classes.media}
          image={url}
          title="点击查看详情"
        />
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleOnDelete}>
          删除
        </Button>
        {
          upload ? (
            <Button size="small" color="primary" onClick={handleUpdate}>
              上传
            </Button>
          ) : (
            <CheckCircleOutlineIcon
              title={'已上传'}
              color={'primary'}
              className={classes.icon}
            />
          )
        }
      </CardActions>
    </Card>
  );
};

export default React.memo(MyCard, (pre, next) => {
  return pre.image.url === next.image.url &&
    pre.upload === next.upload &&
    pre.id === next.id &&
    pre.handleDelete === next.handleDelete &&
    pre.uploadImage === next.uploadImage;
});
