import React, {useCallback} from 'react';
import {Button, Grid, Paper} from "@material-ui/core";
import Card from "./Card";
import Pagination from "../../components/Pagination";
import {deleteImage, deleteImageApi, selectImages, setPage} from "../../redux/imageSlice";
import {useDispatch, useSelector} from "react-redux";
import CardModal from "./CardModal";
import useStyles from './Image.style';


function Image(props) {
  const {
    handleOnCardClick,
    cardId,
    modalOpen,
    addNewImage,
    handlePreCard,
    handleNextCard,
    uploadImage,
    handleUpdate,
    handleUploadAll,
    handleFileUpload,
    setModalOpen
  } = props;

  const dispatch = useDispatch();
  const classes = useStyles();
  const {pagination, images} = useSelector(selectImages);

  const preventDefault = useCallback((e) => {
    e.preventDefault(e);
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(e => {
    preventDefault(e);
    //TODO: 最大同时上传三个文件
    addNewImage(Object.values(e.dataTransfer.files).slice(-3));
  }, [addNewImage, preventDefault]);

  const onChangePage = useCallback((page) => {
    dispatch(setPage(page));
  }, [dispatch]);


  const handleDelete = useCallback((upload, id) => {
    return upload ?
      dispatch(deleteImage([id])) :
      dispatch(deleteImageApi([id]));
  }, [dispatch]);


  return (
    <>
      <Grid
        container
        component={Paper}
        className={classes.label}>
        <input
          className={classes.hidden}
          accept="image/*"
          type="file"
          id="upload-image"
          multiple
          onChange={handleFileUpload}/>
        <Button htmlFor="upload-image" component={'label'} color="primary">
          点击上传图片,或拖拽至下方区域(最大同时上传3张)
        </Button>
        <Button color="primary" onClick={handleUploadAll}>
          上传全部
        </Button>
      </Grid>
      <Grid
        component={Paper}
        container
        onDrop={handleDrop}
        onDragOver={preventDefault}
        onDragEnter={preventDefault}
        onDragLeave={preventDefault}
        className={classes.imageZone}
      >
        {
          modalOpen ?
            <CardModal {...{cardId, setModalOpen, handleDelete, handleUpdate, handleNextCard, handlePreCard}}/> : null
        }
        <div>
          <Grid
            style={{
              margin: '0 auto'
            }}
            spacing={8}
            container
          >
            {
              images.map(item => {
                return (
                  <Grid item key={item.id}>
                    <Card {...{...item, handleDelete, handleOnCardClick, uploadImage, handleUpdate}}/>
                  </Grid>
                );
              })
            }
          </Grid>
        </div>

        <Grid item container justify={'center'}>
          <Pagination {...{
            count: pagination.count,
            page: pagination.page,
            rowsPerPage: pagination.rowsPerPage,
            onChangePage
          }}/>
        </Grid>
      </Grid>
    </>
  );
};

export default Image;
