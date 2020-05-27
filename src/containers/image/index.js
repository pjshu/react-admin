import React from "react";
import {
  queryImages,
  selectImages,
} from "../../redux/imageSlice";
import {useDispatch, useSelector} from "react-redux";
import Image from './Image'

function ImageWrapper() {
  const imagesData = useSelector(selectImages);
  const dispatch = useDispatch();

  const pagination = imagesData.get('pagination');
  const images = imagesData.get('images');
  const rowsPerPage = pagination.get('rowsPerPage');
  const page = pagination.get('page');

  const query = React.useMemo(() => ({
    page: page,
    pageSize: rowsPerPage,
    rowsPerPage: 8
  }), [page, rowsPerPage]);


  React.useEffect(() => {
    dispatch(queryImages(query));
  }, [dispatch, query]);

  return <Image {...{images, pagination}}/>;
};


export default React.memo(ImageWrapper);
