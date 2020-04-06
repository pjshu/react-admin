import React, {useCallback} from "react";
import Image from './Image';
import {v4 as uuidV4} from "uuid";
import {addImages, queryImages, selectImages, uploadImages, uploadImagesDesc} from "../../redux/imageSlice";
import {useDispatch, useSelector} from "react-redux";
import {addWarningMessage} from "../../redux/globalSlice";
import {getImageForm} from "../../helpers/misc";
import {areEqual} from "../../helpers/misc";

const ImageWrapper = React.memo(function ImageWrapper() {
  const {pagination, images} = useSelector(selectImages);
  return <ContextImageWrapper {...{pagination, images}}/>;
});


const ContextImageWrapper = React.memo(function ContextImageWrapper({pagination, images}) {
  const [cardId, setCardId] = React.useState(-1);
  const [modalOpen, setModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const query = React.useMemo(() => ({
    page: pagination.page,
    pageSize: pagination.rowsPerPage,
    rowsPerPage: 8
  }), [pagination.page, pagination.rowsPerPage]);

  React.useEffect(() => {
    dispatch(queryImages(query));
  }, [dispatch, query]);

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

  const handleNextCard = useCallback((id) => {
    const lastCardId = images[images.length - 1].id;
    if (id !== lastCardId) {
      getNextMoveId(id, images);
    } else {
      dispatch(addWarningMessage('已是最后一张'));
    }
  }, [dispatch, images]);

  const handlePreCard = useCallback((id) => {
    const firstCardId = images[0].id;
    if (id !== firstCardId) {
      getNextMoveId(id, images.slice().reverse());
    } else {
      dispatch(addWarningMessage('已是第一张'));
    }
  }, [dispatch, images]);

  const addNewImage = useCallback((files) => {
    const cacheFiles = [];
    files.forEach(file => {
      if (file instanceof File) {
        cacheFiles.push({
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
    dispatch(addImages(cacheFiles));
  }, [dispatch]);

  const handleOnCardClick = useCallback((id) => {
    setCardId(id);
    setModalOpen(true);
  }, []);

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
    //TODO: 最大同时上传三个文件
    addNewImage(Object.values(e.target.files).slice(-3));
  }, [addNewImage]);

  const handleUploadAll = useCallback(() => {
    images.forEach(item => {
      if (item.upload) {
        uploadImage(item.image.url, item.id);
      }
    });
  }, [images, uploadImage]);

  return <Image {...{
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
  }}/>;
}, areEqual);

export default React.memo(ImageWrapper);
