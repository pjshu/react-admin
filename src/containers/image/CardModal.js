import React, {useCallback} from "react";
import {Box, Button, ButtonGroup, Grid, Paper, TextField} from "@material-ui/core";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {useDispatch, useSelector} from "react-redux";
import {selectImages} from "../../redux/imageSlice";
import {Links, UseInfo} from "./CardModalItem";
import useStyles from './cardModal.style';
import {LoadingImg} from '../../components';
import {areEqual} from "../../helpers/misc";
import {addWarningMessage} from "../../redux/globalSlice";
import {setClickCardId, closeCardModal} from '../../redux/imageSlice';

const CardModal = React.memo(function CardModal(props) {
  const {handleUpdate, handleDelete} = props;
  const {images, clickCardId, cardModalOpen} = useSelector(selectImages);
  const dispatch = useDispatch();
  //从images数组中获取被点击图片详细信息
  const image = images.filter(item => item.id === clickCardId)[0];
  const {count, image: {url}, upload, relationship, describe} = image || {
    image: {url: ''}
  };
  const getNextMoveId = React.useCallback((images) => {
    let miss = false;
    for (let item of images) {
      if (item.id === clickCardId) {
        miss = true;
      } else if (miss === true) {
        dispatch(setClickCardId(item.id));
        break;
      }
    }
  }, [clickCardId, dispatch]);

  const handleNextCard = useCallback(() => {
    const lastCardId = images[images.length - 1].id;
    if (clickCardId !== lastCardId) {
      getNextMoveId(images);
    } else {
      dispatch(addWarningMessage('已是最后一张'));
    }
  }, [clickCardId, dispatch, getNextMoveId, images]);

  const handlePreCard = useCallback(() => {
    const firstCardId = images[0].id;
    if (clickCardId !== firstCardId) {
      getNextMoveId(images.slice().reverse());
    } else {
      dispatch(addWarningMessage('已是第一张'));
    }
  }, [clickCardId, dispatch, getNextMoveId, images]);

  const handleUploadDesc = useCallback((cacheDescribe) => {
    handleUpdate(cacheDescribe, upload, clickCardId, url);
  }, [clickCardId, handleUpdate, upload, url]);


  const handleOnClose = useCallback(() => {
    dispatch(closeCardModal());
  }, [dispatch]);

  const handleOnDelete = useCallback(() => {
    handleDelete(upload, clickCardId);
    dispatch(closeCardModal());
  }, [clickCardId, dispatch, handleDelete, upload]);

  return (
    <>
      {
        cardModalOpen ? (
          <ContextCardModal
            {...{
              relationship,
              describe,
              count,
              url,
              handleNextCard,
              handlePreCard,
              handleUploadDesc,
              handleOnDelete,
              handleOnClose,
            }}/>
        ) : null
      }
    </>
  );
}, areEqual);


const ContextCardModal = React.memo(function ContextCardModal(props) {
  const {
    relationship,
    describe,
    count,
    url,
    handleNextCard,
    handlePreCard,
    handleUploadDesc,
    handleOnDelete,
    handleOnClose
  } = props;
  const classes = useStyles();

  const [cacheDescribe, setCacheDescribe] = React.useState(describe);
  const [tabs, setTabs] = React.useState(0);

  const handleUpload = useCallback(() => {
    handleUploadDesc(cacheDescribe);
  }, [cacheDescribe, handleUploadDesc]);

  const handleCacheDescChange = useCallback((e) => {
    setCacheDescribe(e.target.value);
  }, []);

  const handleToFirstTab = useCallback(() => {
    setTabs(0);
  }, []);

  const handleToSecondTab = React.useCallback(() => {
    setTabs(1);
  }, []);

  return (
    <div className={classes.root}>
      <div
        onClick={handlePreCard}
        title={'上一张'}
        className={classes.preButton}
      >
        <ArrowLeftIcon/>
      </div>
      <div
        onClick={handleNextCard}
        title={'下一张'}
        className={classes.nextButton}
      >
        <ArrowRightIcon/>
      </div>
      <Box className={classes.imgWrapper} boxShadow={5} component={Paper}>
        <Grid container justify={'center'}>
          <LoadingImg src={url} alt=""/>
        </Grid>
        <Grid container direction={'column'} alignItems={'center'} spacing={4}>
          <Grid item container>
            <ButtonGroup
              className={classes.buttonGroup}
              fullWidth={true}
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button onClick={handleToFirstTab}>
                链接
              </Button>
              <Button onClick={handleToSecondTab}>
                使用列表
              </Button>
            </ButtonGroup>
          </Grid>
          {
            tabs === 0 ?
              <Links url={url}/> :
              <UseInfo {...{count, relationship}}/>
          }
          <Grid item>
            <TextField
              className={classes.describe}
              id="outlined-multiline-static"
              label="描述"
              multiline
              rows="8"
              variant="outlined"
              value={cacheDescribe || ''}
              onChange={handleCacheDescChange}
            />
          </Grid>
        </Grid>
        <div className={classes.actionBtn}>
          {
            [
              {label: '关闭', onClick: handleOnClose},
              {label: '删除', onClick: handleOnDelete},
              {label: '更新', onClick: handleUpload},
            ].map(item => (
              <Button key={item.label} color="primary" onClick={item.onClick}>
                {item.label}
              </Button>
            ))
          }
        </div>

      </Box>
    </div>
  );
}, areEqual);

export default CardModal;
