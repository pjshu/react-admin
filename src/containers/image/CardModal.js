import React from "react";
import {Box, Button, ButtonGroup, Grid, Paper, TextField} from "@material-ui/core";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {useSelector} from "react-redux";
import {selectImages} from "../../redux/imageSlice";
import {Links, UseInfo} from "./CardModalItem";
import useStyles from './cardModal.style';

const CardModal = (props) => {
  const {images} = useSelector(selectImages);
  const classes = useStyles();
  const image = images.filter(item => item.id === props.cardId)[0];
  const {count, image: {url}, upload, id, relationship, describe} = image;
  const {setModalOpen} = props;
  const [cacheDescribe, setCacheDescribe] = React.useState(describe);
  const [tabs, setTabs] = React.useState(0);

  const handleNextCard = () => {
    props.handleNextCard(id);
  };
  const handlePreCard = () => {
    props.handlePreCard(id);
  };

  const handleOnClose = () => {
    setModalOpen(false);
  };

  const handleUploadDesc = () => {
    props.handleUpdate(cacheDescribe, upload, id, url);
  };
  const handleDelete = () => {
    props.handleOnDelete(upload, id);
    setModalOpen(false);
  };

  const handleCacheDescChange = (e) => {
    setCacheDescribe(e.target.value);
  };
  const handleToFirstTab = () => {
    setTabs(0);
  };
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
        <img src={url} alt=""/>
        <Grid container direction={'column'} alignItems={'center'} spacing={4}>
          <Grid item container>
            <ButtonGroup
              className={classes.buttonGroup}
              fullWidth={true}
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={handleToFirstTab}
              >
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
          <Button color="primary" onClick={handleOnClose}
          >
            关闭
          </Button>
          <Button color="primary" onClick={handleDelete}>
            删除
          </Button>
          <Button color="primary" onClick={handleUploadDesc}>
            更新
          </Button>
        </div>

      </Box>
    </div>
  );
};

export default CardModal;
