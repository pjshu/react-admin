import React from 'react';
import {Grid, Paper} from "@material-ui/core";
import Card from "./Card";
import Pagination from "../../components/Pagination";
import {addWarningMessage} from '../../redux/globalSlice';
import {v4 as uuidV4} from 'uuid';
import {
  addImages,
  deleteImage,
  deleteImageApi,
  queryImages,
  selectImages,
  setPage,
  uploadImages,
  uploadImagesDesc
} from "../../redux/imageSlice";
import {useDispatch, useSelector} from "react-redux";
import CardModal from "./CardModal";
import {getImageForm} from "../../helpers/misc";
import useStyles from './Image.style';


function Image() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {pagination, images} = useSelector(selectImages);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [cardId, setCardId] = React.useState(-1);
  const handleOnCardClick = (id) => {
    setCardId(id);
    setModalOpen(true);
  };

  const query = React.useMemo(() => ({
    page: pagination.page,
    pageSize: pagination.rowsPerPage,
    rowsPerPage: 8
  }), [pagination.page, pagination.rowsPerPage]);

  const preventDefault = (e) => {
    e.preventDefault(e);
    e.stopPropagation();
  };
  const handleDrop = e => {
    preventDefault(e);
    //TODO: 最大同时上传三个文件
    const files = [];
    Object.values(e.dataTransfer.files).slice(-3).forEach(file => {
      if (file instanceof File) {
        files.push({
          id: uuidV4(),
          image: {
            name: file.name,
            url: URL.createObjectURL(file),
          },
          describe: '',
          relationship: [],
          count: 0,
          upload: true, // 需要上传的图片设置该字段为true
        });
      }
    });
    dispatch(addImages(files));
  };

  React.useEffect(() => {
    dispatch(queryImages(query));
  }, [query]);

  const onChangePage = (page) => {
    dispatch(setPage(page));
  };

  const getNextMoveId = (id, images) => {
    let miss = false;
    for (let item of images) {
      if (item.id === id) {
        miss = true;
      } else if (miss === true) {
        setCardId(item.id);
        break;
      }
    }
  };

  const handleNextCard = (id) => {
    const lastCardId = images[images.length - 1].id;
    if (id !== lastCardId) {
      getNextMoveId(id, images);
    } else {
      dispatch(addWarningMessage('已是最后一张'));
    }
  };

  const handlePreCard = (id) => {
    const firstCardId = images[0].id;
    if (id !== firstCardId) {
      getNextMoveId(id, images.slice().reverse());
    } else {
      dispatch(addWarningMessage('已是第一张'));
    }
  };

  const handleOnDelete = React.useCallback((upload, id) => {
    return upload ?
      dispatch(deleteImage([id])) :
      dispatch(deleteImageApi([id]));
  }, []);

  const uploadImage = (url, id) => {
    getImageForm(url).then(form => {
      dispatch(uploadImages(form, id));
    });
  };
  //修改图片描述
  const handleUpdate = React.useCallback((describe, upload, id, url) => {
    // 如果图片未上传,先更新图片,再更新图片描述
    //TODO:BUG uploadImages完成可能在uploadImagesDesc完成后
    uploadImage(url, id);
    dispatch(uploadImagesDesc(describe, id));
  }, []);

  return (
    <Grid
      onDrop={handleDrop}
      onDragOver={preventDefault}
      onDragEnter={preventDefault}
      onDragLeave={preventDefault}
      component={Paper}
      className={classes.classes}
      container justify={'center'}
      alignItems={"center"}
      spacing={6}
    >
      {
        modalOpen ?
          <CardModal {...{cardId, setModalOpen, handleOnDelete, handleUpdate, handleNextCard, handlePreCard}}/> : null
      }
      <Grid item>
        <Grid
          spacing={8}
          justify={"center"}
          container>
          {
            images.map(item => {
              return (
                <Grid item key={item.id}>
                  <Card {...{...item, handleOnDelete, handleOnCardClick, uploadImage, handleUpdate}}/>
                </Grid>
              );
            })
          }
        </Grid>
      </Grid>
      <Grid item container justify={'center'}>
        <Pagination {...{
          count: pagination.count,
          page: pagination.page,
          rowsPerPage: pagination.rowsPerPage,
          onChangePage
        }}/>
      </Grid>
    </Grid>
  );
};

export default Image;
