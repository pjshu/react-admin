import React, {useCallback, useMemo} from "react";
import {Box, Button, ButtonGroup, Grid, Paper, TextField} from "@material-ui/core";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {useDispatch, useSelector} from "react-redux";
import {selectImagesSlice} from "../../redux/imageSlice";
import {Links, UseInfo} from "./CardModalItem";
import useStyles from './cardModal.style';
import LoadingImg from '../../components/LoadingImg';
import {addWarningMessage} from "../../redux/globalSlice";
import {setClickCardId, closeCardModal} from '../../redux/imageSlice';
import {getAttr} from "../../helpers/misc";

const CardModal = React.memo(function CardModal(props) {
  const {handleUpdate, handleDelete} = props;
  const imagesData = useSelector(selectImagesSlice);
  const [clickCardId, cardModalOpen, images] = getAttr(imagesData, ['clickCardId', 'cardModalOpen', 'images']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const image = images.filter(item => item.get('id') === clickCardId).get(0);
  //从images数组中获取被点击图片详细信息
  const [upload, url, describe, count, relationship] = useMemo(() => {
    return image ?
      [image.get('upload'), image.getIn(['image', 'url']), image.get('describe'), image.get('count'), image.get('relationship')] :
      [null, '', ''];
  }, [image]);

  const [cacheDescribe, setCacheDescribe] = React.useState(describe);
  const [tabs, setTabs] = React.useState(0);

  const getNextMoveId = useCallback((images) => {
    let miss = false;
    for (let item of images) {
      if (item.get('id') === clickCardId) {
        miss = true;
      } else if (miss === true) {
        dispatch(setClickCardId(item.get('id')));
        break;
      }
    }
  }, [clickCardId, dispatch]);

  const handleNextCard = useCallback(() => {
    const lastCardId = images.getIn([-1, 'id']);
    if (clickCardId !== lastCardId) {
      getNextMoveId(images);
    } else {
      dispatch(addWarningMessage('已是最后一张'));
    }
  }, [clickCardId, dispatch, getNextMoveId, images]);

  const handlePreCard = useCallback(() => {
    const firstCardId = images.getIn([0, 'id']);
    if (clickCardId !== firstCardId) {
      getNextMoveId(images.reverse());
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
    <>
      {
        cardModalOpen && (
          <>
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
                      <UseInfo {...{count, relationship}}
                      />
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
          </>
        )
      }
    </>
  );
});


export default CardModal;
