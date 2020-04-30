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

export const blob2Base64 = (data) => new Promise((resolve => {
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
  // 对比数组
  const arrayCompare = (pre, next) => {
    if (pre.length !== next.length) {
      isEqual = false;
      return;
    }
    for (let index in pre) {
      if (isEqual === false) {
        break;
      }
      deepCompare(pre[index], next[index]);
    }
  };

  //对比非数组对象
  const objCompare = (pre, next) => {
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
        deepCompare(pre[key], next[key]);
      }
    } else if (preKey.length === 0 && nextKey.length === 0) {

    } else {
      isEqual = false;
    }
  };
  //对比特殊键值对
  const specialCompare = (pre, next) => {
    let special = false;
    if (pre && next) {
      if (pre.key && next.key) {
        isEqual = pre.key === next.key;
        special = true;
      } else if (pre.id && next.id) {
        isEqual = pre.id === next.id;
        special = true;
      }
      //通过convertOptions属性判断是不是 BraftEditor对象
      else if (pre.convertOptions && next.convertOptions) {
        isEqual = pre === next;
        special = true;
      }
    } else {
      isEqual = pre === next;
      special = true;
    }
    return special;
  };

  const deepCompare = (pre, next) => {
    compare += 1;
    if (compare > 25) {
      console.log(prePro, compare);
    }
    if (isEqual === false || specialCompare(pre, next)) {
      return;
    }
    if (pre instanceof Array && next instanceof Array) {
      arrayCompare(pre, next);
    } else if (pre instanceof Object && next instanceof Object) {
      objCompare(pre, next);
    } else {
      isEqual = (pre === next);
    }
  };
  deepCompare(prePro, nextPro);
  return isEqual;
};

export const areEqual = (pre, next) => {
  return objAreEqual(pre, next);
};
