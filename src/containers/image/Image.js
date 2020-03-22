import React from 'react';
import {Paper, Grid} from "@material-ui/core";
import Card from "./Card";
import p1 from './1.png';
import Table from '../../components/table';
import api, {api as API} from "../../helpers/http";
import Chip from '@material-ui/core/Chip';


function Image() {

  const ImgCell = ({values}) => {
    return (
      <div title={'双击放大'} style={{
        width: '150px'
      }}>
        <img style={{
          height: '150px',
          width: '150px'
        }} src={API.baseImage + values} alt=""/>
      </div>
    );
  };

  const RelCell = ({values}) => {
    return (
      <div>
        {
          values.map(item => (
            <div key={item.id}>
              <Chip label={`${item.type}:${item.name}`}/>
            </div>
          ))
        }
      </div>
    );
  };
  const columns = React.useMemo(
    () => [
      {
        id: 'id',
        Header: 'id',
        accessor: 'id',
        disableSortBy: true
      },
      {
        width: 150,
        Header: '略缩图',
        accessor: 'url',
        disableSortBy: true,
        Cell: ({cell: {value}}) => <ImgCell values={value}/>
      },
      {
        Header: '描述',
        accessor: 'describe',
        disableSortBy: true
      },
      {
        Header: '使用次数',
        accessor: 'count',
      },
      {
        Header: '关系',
        accessor: 'relationship',
        Cell: ({cell: {value}}) => <RelCell values={value}/>
      }
    ],
    []
  );
  const handleEditor = () => {

  };
  return (
    <div>
            <Grid
        spacing={8}
        justify={"center"}
        container
      >
        <Grid item>
          <Card image={p1}/>
        </Grid>
        <Grid item>
          <Card image={p1}/>
        </Grid>
        <Grid item>
          <Card image={p1}/>
        </Grid>
        <Grid item>
          <Card image={p1}/>
        </Grid>
        <Grid item>
          <Card image={p1}/>
        </Grid>
        <Grid item>
          <Card image={p1}/>
        </Grid>
      </Grid>
      {/*<Table*/}
      {/*  columns={columns}*/}
      {/*  tableName={'图片'}*/}
      {/*  handleEditor={handleEditor}*/}
      {/*  api={{*/}
      {/*    query: api.queryImages,*/}
      {/*    delete: api.deleteImage,*/}
      {/*    modify: api.modifyImageInfo,*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  );
}

export default Image;
