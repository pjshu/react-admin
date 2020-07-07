import React, {useCallback} from "react";
import {Field} from '../../components/Form';
import MyEditor from '../../components/editor/Editor';
import Setting from "./Setting";
import SpeedSetting from "./SpeedSetting";
import {useDispatch} from "react-redux";
import {addPostImg} from '../../redux/postSlice';
import FORM from "../../contants/form.json";


const contentStyle = {
  height: '500px'
};

function Post({postId}) {
  const dispatch = useDispatch();

  const uploadFn = useCallback((form, successFn, errorFn) => {
    dispatch(addPostImg(form, postId, successFn, errorFn));
  }, [dispatch, postId]);


  return (
    <form>
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
        postId={postId}
      />
      <SpeedSetting postId={postId}/>
    </form>
  );
};

export default React.memo(Post);
