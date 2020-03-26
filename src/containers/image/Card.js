import React from 'react';
import {Box, Button, Card, CardActionArea, CardActions, CardMedia} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import useStyles from './card.style';

const MyCard = (props) => {
  const classes = useStyles();
  const {image: {url}, upload, handleOnCardClick, id, handleDelete, uploadImage} = props;
  const handleOnDelete = () => {
    handleDelete(upload, id);
  };
  const handleUpdate = () => {
    uploadImage(url, id);
  };
  const handleOnClick = () => {
    handleOnCardClick(id);
  };
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

export default MyCard;
