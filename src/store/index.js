import React, {createContext, useReducer} from "react";
import {dispatchWrapper as postWrapper, initialState as postInit, reducer as postReducer} from './post';
import {dispatchWrapper as userWrapper, initialState as userInit, reducer as userReducer} from './user';

const PostContext = createContext();
const UserContext = createContext();

const PostProvider = (props) => {
  const [userState, userDispatch] = useReducer(postReducer, userInit);
  const [postState, postDispatch] = useReducer(userReducer, postInit);
  return (
    <PostContext.Provider value={{state: postState, actions: postWrapper(userDispatch)}}>
      <UserContext.Provider value={{state: userState, actions: userWrapper(postDispatch)}}>
        {props.children}
      </UserContext.Provider>
    </PostContext.Provider>
  );
};

export default PostProvider;
export {PostContext, UserContext};
