import BraftEditor from "braft-editor";

export async function getImageForm(blobUrl) {
  const form = new FormData();
  const blob = await fetch(blobUrl).then(r => r.blob());
  form.append('image', blob);
  return form;
}

//转化BraftState
export const toRaw = (data, field) => {
  try {
    data[field] = data[field].toRAW();
  } catch (e) {

  }
};

export const toEditorState = (data) => {
  return BraftEditor.createEditorState(data);
};
export const blog2Base64 = (data) => new Promise((resolve => {
  fetch(data).then(res => {
    res.blob().then(res => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  });
}));

// 对象对比函数
// TODO 优化算法
// 或者使用immutable
export const objAreEqual = (prePro, nextPro, blacklist = []) => {
  let isEqual = true;
  let compare = 0;
  blacklist.push('cacheBusterProp');
  const _objAreEqual = (pre, next) => {
    compare += 1;
    if (compare > 20) {
      alert(compare);
      console.log(prePro, compare);
    }
    if (isEqual === false) {
      return;
    }
    // pre不能为undefine 且有key属性
    if (pre && next) {
      if (pre.hasOwnProperty('key')) {
        if (next.hasOwnProperty('key')) {
          isEqual = pre.key === next.key;
          return;
        }
        isEqual = false;
        return;
      }
      if (pre.hasOwnProperty('id')) {
        if (next.hasOwnProperty('id')) {
          isEqual = pre.id === next.id;
          return;
        }
        isEqual = false;
        return;
      }
      // TODO
      //暂且通过convertOptions属性判断是不是 BraftEditor对象
      if (pre.hasOwnProperty('convertOptions')) {
        if (next.hasOwnProperty('convertOptions')) {
          isEqual = pre === next;
          return;
        }
      }
    }
    if (pre instanceof Object && next instanceof Object) {
      if (pre instanceof Function) {
        isEqual = (pre === next);
        return;
      }
      const preKey = Object.keys(pre);
      const nextKey = Object.keys(next);
      if (preKey.length !== 0 && nextKey.length !== 0) {
        for (let key of preKey) {
          if (blacklist.includes(key)) {
            continue;
          }
          if (!isEqual) {
            break;
          }
          _objAreEqual(pre[key], next[key]);
        }
      } else if (preKey.length === 0 && nextKey.length === 0) {

      } else {
        isEqual = false;
      }
    } else if (pre instanceof Array && next instanceof Array) {
      for (let index in pre) {
        if (isEqual === false) {
          break;
        }
        _objAreEqual(pre[index], next[index]);
      }
    } else {
      isEqual = (pre === next);
    }
  };
  _objAreEqual(prePro, nextPro);
  return isEqual;
};

export const areEqual = (pre, next) => {
  return objAreEqual(pre, next);
};
