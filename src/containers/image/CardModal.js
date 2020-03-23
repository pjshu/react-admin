import React from "react";
import {Box, Button, Grid, Paper, TextField, Typography} from "@material-ui/core";

const CardModal = (props) => {
  const {count, modalOpen, setModalOpen, image: {url}, relationship, describe, handleUpdate, handleOnDelete} = props;
  const [cacheDescribe, setCacheDescribe] = React.useState(describe);
  const handleOnClose = () => {
    setModalOpen(false);
  };
  const handleUploadDesc = () => {
    handleUpdate(cacheDescribe);
  };
  const handleDelete = () => {
    handleOnDelete();
    setModalOpen(false);
  };
  const handleCacheDescChange = (e) => {
    setCacheDescribe(e.target.value);
  };
  return (
    <div style={{
      display: modalOpen ? '' : 'none',
      position: 'absolute',
      zIndex: '100',
      left: '50%',
      top: '52%',
      transform: 'translate(-50%, -50%)'
    }}>
      <Box style={{
        padding: 10,
        width: 700,
        height: 800,
      }} boxShadow={5} component={Paper}>
        <img style={{
          maxWidth: 680,
          maxHeight: 370
        }} src={url} alt=""/>
        <Grid container direction={'column'} alignItems={'center'} spacing={4}>
          <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              链接: {url}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              使用列表({count})
              {
                relationship.map(item => (
                  <span key={item.name}>{item.type}:{item.name};</span>
                ))
              }
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              style={{
                width: 680
              }}
              id="outlined-multiline-static"
              label="描述"
              multiline
              rows="8"
              variant="outlined"
              value={cacheDescribe || ''}
              onChange={handleCacheDescChange}
            />
          </Grid>
        </Grid>
        <Button style={{
          position: 'absolute',
          right: 20,
          bottom: 20
        }} color="primary" onClick={handleOnClose}
        >
          关闭
        </Button>
        <Button
          style={{
            position: 'absolute',
            right: 80,
            bottom: 20
          }} color="primary" onClick={handleDelete}
        >
          删除
        </Button>
        <Button style={{
          position: 'absolute',
          right: 140,
          bottom: 20
        }} color="primary" onClick={handleUploadDesc}
        >
          更新
        </Button>
      </Box>
    </div>
  );
};

export default CardModal;
