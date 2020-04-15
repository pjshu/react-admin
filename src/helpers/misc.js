import BraftEditor from "../config/editor";

export async function getImageForm(blobUrl) {
  const form = new FormData();
  const blob = await fetch(blobUrl).then(r => r.blob());
  form.append('image', blob);
  return form;
}

//转化BraftState
export const convertEditorState = (data, field) => {
  try {
    data[`${field}_html`] = data[field].toHTML();
    data[field] = data[field].toRAW();
  } catch (e) {

  }
};

export const toEditorState = (data, editorId) => {
  return BraftEditor.createEditorState(data, {editorId});
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


export const simpleObjAreEqual = (handleSpecial) => {
  let isEqual = true;

};

// 对象对比函数
// TODO 优化算法
// 或者使用immutable
export const objAreEqual = (prePro, nextPro, blacklist = []) => {
  let isEqual = true;
  let compare = 0;
  const _objAreEqual = (pre, next) => {
    compare += 1;
    if (compare > 20) {
      console.log(prePro, compare, pre);
    }
    if (isEqual === false) {
      return;
    }
    if (pre && next) {
      if (pre.key && next.key) {
        isEqual = pre.key === next.key;

      } else if (pre.id && next.id) {
        isEqual = pre.id === next.id;
      }
      //通过convertOptions属性判断是不是 BraftEditor对象
      else if (pre.convertOptions && next.convertOptions) {
        isEqual = pre === next;
      }
    }
    // [] instanceof Object true
    if (pre instanceof Array && next instanceof Array) {
      if (pre.length !== next.length) {
        isEqual = false;
        return;
      }
      for (let index in pre) {
        if (isEqual === false) {
          break;
        }
        _objAreEqual(pre[index], next[index]);
      }
    } else if (pre instanceof Object && next instanceof Object) {
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
