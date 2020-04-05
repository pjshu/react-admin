import React, {useCallback} from "react";
import {Container, Grid, Paper, TextField, Box} from "@material-ui/core";
import {Field, SubmitBtn} from '../../components/Form';
import MyEditor from '../../components/editor/Editor';
import Setting from "./Setting";
import SpeedSetting from "./SpeedSetting";
import useStyles from "./post.style";
import {useDispatch, useSelector} from "react-redux";
import {addPostImg, selectPost} from '../../redux/postSlice';


function Post({postId, onSubmit, handleOnSave}) {
  const dispatch = useDispatch();

  const uploadFn = useCallback((form, successFn, errorFn) => {
    dispatch(addPostImg(form, postId, successFn, errorFn));
  }, [dispatch, postId]);

  const handleKeyDown = useCallback((e) => {
    handleOnSave(e);
  }, [handleOnSave]);

  const getValue = useCallback(value => {
    return value;
  }, []);

  const classes = useStyles();
  return (
    <Container onKeyDown={handleKeyDown} component={Paper} className={classes.root} maxWidth={false}>
      <div id={'post-form'}>
        <Grid container alignItems="center">
          <Field
            name="title"
            label="标题"
            formName={'post'}
          />
        </Grid>
        {/*<Field*/}
        {/*  as={MyEditor}*/}
        {/*  formName={'post'}*/}
        {/*  name={'article'}*/}
        {/*  uploadFn={uploadFn}*/}
        {/*  getValue={getValue}*/}
        {/*  contentStyle={{*/}
        {/*    minHeight: '700px'*/}
        {/*  }}*/}
        {/*/>*/}
        <Setting
          onSubmit={onSubmit}
          uploadFn={uploadFn}
        />
        <SpeedSetting/>
      </div>
    </Container>
  );

}

export default Post;
