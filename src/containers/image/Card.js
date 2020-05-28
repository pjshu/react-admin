import React, {useCallback} from 'react';
import {Box, Button, Card, CardActionArea, CardActions, CardMedia} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import useStyles from './card.style';
import {useDispatch} from "react-redux";
import {setClickCardId, openCardModal} from '../../redux/imageSlice';
import {areEqual, getAttr} from "../../helpers/misc";

const MyCard = (props) => {
  const {imageItem, handleDelete, uploadImage} = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [url, upload, id] = getAttr(imageItem, [
    ['image', 'url'], 'upload', 'id'
  ]);
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

export default React.memo(MyCard, areEqual);
