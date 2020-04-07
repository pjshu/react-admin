import React, {useCallback} from "react";
import Image from './Image';
import {v4 as uuidV4} from "uuid";
import {addImages, queryImages, selectImages, uploadImages, uploadImagesDesc} from "../../redux/imageSlice";
import {useDispatch, useSelector} from "react-redux";
import {getImageForm} from "../../helpers/misc";
import {areEqual} from "../../helpers/misc";

const ImageWrapper = React.memo(function ImageWrapper() {
  const {pagination, images} = useSelector(selectImages);
  return <ContextImageWrapper {...{pagination, images}}/>;
});


const ContextImageWrapper = React.memo(function ContextImageWrapper({pagination, images}) {
  // 记录被点击卡片id,用于获取下一张/上一张卡片
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
    cardId,
    setCardId,
    modalOpen,
    addNewImage,
    uploadImage,
    handleUpdate,
    handleUploadAll,
    handleFileUpload,
    setModalOpen,
  }}/>;
}, areEqual);

export default ImageWrapper;
