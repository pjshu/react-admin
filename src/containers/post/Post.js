import React, {useCallback} from "react";
import {Grid} from "@material-ui/core";
import {Field} from '../../components/Form';
import MyEditor from '../../components/editor/Editor';
import Setting from "./Setting";
import SpeedSetting from "./SpeedSetting";
import {useDispatch} from "react-redux";
import {addPostImg} from '../../redux/postSlice';
import {FORM} from "../../redux/formSlice";

function Post({postId}) {
  const dispatch = useDispatch();

  const uploadFn = useCallback((form, successFn, errorFn) => {
    dispatch(addPostImg(form, postId, successFn, errorFn));
  }, [dispatch, postId]);

  const contentStyle = {
    height: '500px'
  };

  return (
    <>
      <div id={'post-form'}>
        <div>
          <Field
            name="title"
            label="标题"
            formName={FORM.post}
          />
        </div>
        <MyEditor
          name={'article'}
          uploadFn={uploadFn}
          contentStyle={contentStyle}
        />
        <Setting
          uploadFn={uploadFn}
          postId={postId}
        />
        <SpeedSetting/>
      </div>
    </>
  );
};

export default React.memo(Post);
