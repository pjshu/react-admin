import React, {useCallback} from 'react';
import {Button, Grid, Paper} from "@material-ui/core";
import Card from "./Card";
import Pagination from "../../components/Pagination";
import {
  addImages,
  deleteImage,
  deleteImageApi,
  setPage,
  uploadImages,
  uploadImagesDesc
} from "../../redux/imageSlice";
import {useDispatch} from "react-redux";
import CardModal from "./CardModal";
import useStyles from './Image.style';
import {areEqual, getImageForm} from "../../helpers/misc";
import {v4 as uuidV4} from "uuid";
import {max_upload_image_length} from "../../config/security";


function Image(props) {
  const {images, pagination} = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const parseFile = useCallback(file => {
    return {
      id: uuidV4(),
      image: {
        name: file.name,
        url: URL.createObjectURL(file),
      },
      describe: '',
      relationship: [],
      count: 0,
      upload: true, // 需要上传的图片设置该字段为true
    }
  },[])

  const addNewImage = useCallback((files) => {
    const cacheFiles = [];
    files.forEach(file => {
      if (file instanceof File) {
        cacheFiles.push(parseFile(file));
      }
    });
    dispatch(addImages(cacheFiles));
  }, [dispatch, parseFile]);

  const uploadImage = useCallback((url, id) => {
    getImageForm(url).then(form => {
      dispatch(uploadImages(form, id));
    });
  }, [dispatch]);

  //修改图片描述
  const handleUpdate = useCallback((describe, upload, id, url) => {
    // 如果图片未上传,先更新图片,再更新图片描述
    //TODO:BUG uploadImages完成可能在uploadImagesDesc完成后
    if (upload) {
      uploadImage(url, id);
    }
    dispatch(uploadImagesDesc(describe, id));
  }, [dispatch, uploadImage]);


  const handleFileUpload = useCallback((e) => {
    addNewImage(Object.values(e.target.files).slice(-max_upload_image_length));
  }, [addNewImage]);

  const handleUploadAll = useCallback(() => {
    images.forEach(item => {
      if (item.get('upload')) {
        uploadImage(item.getIn(['image', 'url']), item.get('id'));
      }
    });
  }, [images, uploadImage]);


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
        <CardModal {...{handleDelete, handleUpdate}}/>
        <div>
          <Grid
            className={classes.autoCenter}
            spacing={8}
            container
          >
            {
              images.map(image => {
                return (
                  <Grid key={image.get('id')} item>
                    <Card
                      imageItem={image}
                      handleDelete={handleDelete}
                      uploadImage={uploadImage}
                    />
                  </Grid>
                );
              })
            }
          </Grid>
        </div>

        <Grid item container justify={'center'}>
          <Pagination {...{
            count: pagination.get('count'),
            page: pagination.get('page'),
            rowsPerPage: pagination.get('rowsPerPage'),
            onChangePage
          }}/>
        </Grid>
      </Grid>
    </>
  );
}

export default React.memo(Image, areEqual);
