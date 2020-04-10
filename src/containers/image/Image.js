import React, {useCallback} from 'react';
import {Button, Grid, Paper} from "@material-ui/core";
import Card from "./Card";
import Pagination from "../../components/Pagination";
import {deleteImage, deleteImageApi, selectImages, setPage} from "../../redux/imageSlice";
import {useDispatch, useSelector} from "react-redux";
import CardModal from "./CardModal";
import useStyles from './Image.style';
import {areEqual} from "../../helpers/misc";
import {max_upload_image_length} from '../../config/security';


function Image(props) {
  const {
    addNewImage,
    handleUpdate,
    handleUploadAll,
    handleFileUpload,
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
    addNewImage(Object.values(e.dataTransfer.files).slice(-max_upload_image_length));
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
        container
        component={Paper}
        onDrop={handleDrop}
        onDragOver={preventDefault}
        onDragEnter={preventDefault}
        onDragLeave={preventDefault}
        className={classes.imageZone}
      >
        <CardModal {...{
          handleUpdate,
          handleDelete,
        }}/>
        <div>
          <Grid
            className={classes.autoCenter}
            spacing={8}
            container
          >
            {
              images.map(item => {
                return (
                  <Grid key={item.id} item>
                    <Card
                      {...{
                        ...item,
                        handleDelete,
                      }}/>
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
}

export default React.memo(Image, areEqual);
