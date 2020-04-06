import React, {useCallback} from "react";
import {Box, Button, ButtonGroup, Grid, Paper, TextField} from "@material-ui/core";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {useSelector} from "react-redux";
import {selectImages} from "../../redux/imageSlice";
import {Links, UseInfo} from "./CardModalItem";
import useStyles from './cardModal.style';
import LoadingImg from '../../components/LoadingImg';
import {areEqual} from "../../helpers/misc";

const CardModal = React.memo(function CardModal({modalOpen, cardId, ...props}) {
  const {images} = useSelector(selectImages);

  const image = images.filter(item => item.id === cardId)[0];
  const {count, image: {url}, upload, id, relationship, describe} = image;
  return <ContextCardModal {...{modalOpen, upload, id, relationship, describe, count, url, ...props}}/>;
}, areEqual);

const ContextCardModal = React.memo(function ContextCardModal(props) {
  const {
    upload,
    id,
    relationship,
    modalOpen,
    describe,
    count,
    url,
    setModalOpen,
    handleUpdate,
    handleDelete
  } = props;
  const classes = useStyles(modalOpen);

  const [cacheDescribe, setCacheDescribe] = React.useState(describe);
  const [tabs, setTabs] = React.useState(0);

  const handleNextCard = () => {
    props.handleNextCard(id);
  };
  const handlePreCard = () => {
    props.handlePreCard(id);
  };

  const handleOnClose = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  const handleUploadDesc = useCallback(() => {
    handleUpdate(cacheDescribe, upload, id, url);
  }, [cacheDescribe, id, handleUpdate, upload, url]);

  const handleOnDelete = useCallback(() => {
    handleDelete(upload, id);
    setModalOpen(false);
  }, [id, handleDelete, setModalOpen, upload]);

  const handleCacheDescChange = useCallback((e) => {
    setCacheDescribe(e.target.value);
  }, []);

  const handleToFirstTab = useCallback(() => {
    setTabs(0);
  }, []);

  const handleToSecondTab = () => {
    setTabs(1);
  };
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
              {label: '更新', onClick: handleUploadDesc},
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
