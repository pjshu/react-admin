import React from "react";
import {
  queryImages,
  selectImagesSlice,
} from "../../redux/imageSlice";
import {useDispatch, useSelector} from "react-redux";
import Image from './Image';
import {getAttr} from "../../helpers/misc";
import {injectReducer} from "../../redux/store";
import reducer from '../../redux/imageSlice';

function ImageWrapper() {
  injectReducer('images', reducer);
  const imagesData = useSelector(selectImagesSlice);
  const dispatch = useDispatch();
  const [pagination, images, rowsPerPage] = getAttr(imagesData, [
    'pagination', 'images', 'rowsPerPage'
  ]);
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
}


export default React.memo(ImageWrapper);
