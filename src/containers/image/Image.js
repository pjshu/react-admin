import React from 'react';
import {Grid, useMediaQuery, useTheme} from "@material-ui/core";
import Card from "./Card";
import p1 from './1.png';
import Pagination from "../../components/Pagination";
import api from '../../helpers/http';

function Image() {
  const [pagination, setPagination] = React.useState({
    count: 0,
    page: 0,
    rowsPerPage: 8
  });
  const [images, setImages] = React.useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const query = React.useMemo(() => ({
    page: pagination.page,
    pageSize: pagination.rowsPerPage,
    rowsPerPage: matches ? 16 : 8
  }), [pagination.page, pagination.rowsPerPage, matches]);

  React.useEffect(() => {
    api.queryImages(query).then(res => {
      const data = res.data;
      setPagination({
        ...pagination,
        count: data.total,
      });
      setImages(data.values);
    });
  }, []);

  const onChangePage = (page) => {
    setPagination({...pagination, page});
  };
  return (
    <Grid style={{
      position: 'relative',
      minHeight: '100%'
    }} container justify={'center'} alignItems={"center"} spacing={6}>
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
}

export default Image;
