import Login from './Login';
import React, {Profiler} from 'react';
import Loading from "../../components/Loading";
import {Redirect} from 'react-router-dom';
import {useAuth} from "../../hook";

function onRenderCallback(...props) {
  const [
    id, // 发生提交的 Profiler 树的 “id”
    phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
    actualDuration, // 本次更新 committed 花费的渲染时间
    baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
    startTime, // 本次更新中 React 开始渲染的时间
    commitTime, // 本次更新中 React committed 的时间
    interactions // 属于本次更新的 interactions 的集合
  ] = props;
  console.log({
    id, // 发生提交的 Profiler 树的 “id”
    phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
    actualDuration, // 本次更新 committed 花费的渲染时间
    baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
    startTime, // 本次更新中 React 开始渲染的时间
    commitTime, // 本次更新中 React committed 的时间
    interactions // 属于本次更新的 interactions 的集合
  });
}

export default () => {
  const [state, from] = useAuth();
  return (
    <Profiler id={'login'} onRender={onRenderCallback}>
      {
        state.loading ? <Loading/> :
          state.auth ? <Redirect to={from}/> : <Login/>
      }
    </Profiler>
  );
};
