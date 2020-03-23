import React from 'react';
import {Grid, useMediaQuery, useTheme, Paper} from "@material-ui/core";
import Card from "./Card";
import Pagination from "../../components/Pagination";
import {v4 as uuidV4} from 'uuid';
import {selectImages, queryImages, setPage, addImages} from "../../redux/imageSlice";
import {useDispatch, useSelector} from "react-redux";


function Image() {
  const dispatch = useDispatch();
  const {pagination, images} = useSelector(selectImages);
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
    // 最大同时上传三个文件
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
  return (
    <Grid
      onDrop={handleDrop}
      onDragOver={preventDefault}
      onDragEnter={preventDefault}
      onDragLeave={preventDefault}
      component={Paper}
      style={{
        // position: 'relative',
        // minHeight: '100%',
        margin: 10,
        padding: 10,
        boxSizing: "border-box",
        // border: '1px dashed'
      }}
      container justify={'center'}
      alignItems={"center"}
      spacing={6}
    >
      <Grid item>
        <Grid
          spacing={8}
          justify={"center"}
          container>
          {
            images.map(item => {
              return (
                <Grid item key={item.id}>
                  <Card {...item}/>
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
