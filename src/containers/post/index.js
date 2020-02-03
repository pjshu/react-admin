import React, {useState} from "react";
import Post from './Post';
import BraftEditor from "../../config/editorConfig";
import {formatTime} from "../../helpers/datetime";

function PostWrapper() {
  const [postState, setPostState] = useState({
    postId: -1,
    title: '',
    tags: [],
    visibility: '私密',
    article: BraftEditor.createEditorState(null),
    allTags: [],
    comments: 0,
    createDate: formatTime(new Date()),
    changeDate: formatTime(new Date())
  });
  const init = (state) => {
    setPostState(
      (postState) => ({...postState, ...state})
    );

  };

  const addAllTags = (allTags) => {
    setPostState(
      (postState) => ({...postState, allTags})
    );
  };
  return <Post {...{postState, addAllTags, init}}/>;
}

export default PostWrapper;
