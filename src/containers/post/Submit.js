// @flow
// 定时提交
import React, {useCallback} from 'react';
import FORM from "../../contants/form.json";
import {useSubmit} from "../../hooks/Submit";
import SaveIcon from "@material-ui/icons/Save";
import {useSubmitPost} from '../../hooks/post';
import {validatePost} from '../../helpers/validate';

const SubmitPost = React.memo(function SubmitPost({postId}) {
  const onSubmit = useSubmitPost(postId);
  const handleOnSubmit = useSubmit(FORM.post, onSubmit, validatePost, validatePost);

  const handleOnClick = useCallback((e) => {
    e.preventDefault();
    handleOnSubmit();
  }, [handleOnSubmit]);

  return (
    <SaveIcon onClick={handleOnClick}/>
  );
});

export {SubmitPost};
