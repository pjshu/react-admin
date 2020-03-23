import React from 'react';
import {
  Button,
  makeStyles,
  Card,
  Box,
  CardMedia,
  CardActionArea,
  CardActions
} from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux";
import {deleteImageApi, uploadImages, deleteImage, uploadImagesDesc} from "../../redux/imageSlice";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {getImageForm} from '../../helpers/misc';
import CardModal from './CardModal';

const useStyles = makeStyles({
  root: {
    padding: 10,
    width: 345,
    height: 220,
    position: 'relative'
    // minWidth:300,
    // maxWidth: 345,
  },
  media: {
    height: 160,
  },
  icon: {
    position: 'absolute',
    right: 10
  }
});
const MyCard = ({image: {url}, upload, id, onClick, handleOnDelete, handleUpdate, ...rest}) => {
  const classes = useStyles();
  return (
    <Card component={Box} boxShadow={5} className={classes.root} {...rest}>
      <CardActionArea onClick={onClick}>
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

export default function MediaCard(props) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleModalOpen = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };
  const handleOnDelete = React.useCallback(() => {
    return props.upload ?
      dispatch(deleteImage([props.id])) :
      dispatch(deleteImageApi([props.id]));
  }, []);

  //修改图片描述
  const handleUpdate = React.useCallback((describe) => {
    // 如果图片未上传,先更新图片,再更新图片描述
    //TODO:BUG uploadImages完成可能在uploadImagesDesc完成后
    if (props.upload) {
      getImageForm(props.url).then(form => {
        dispatch(uploadImages(form, props.id));
      });
    }
    dispatch(uploadImagesDesc(describe, props.id));
  }, []);
  return (
    <>
      <CardModal {...{...props, modalOpen, setModalOpen, handleOnDelete, handleUpdate}}/>
      <MyCard {...{...props, handleOnDelete, handleUpdate, onClick: handleModalOpen}}/>
    </>
  );
}
