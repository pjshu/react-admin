import React, {useCallback, useMemo} from 'react';
import {changeFormField as _changeFormField, selects} from "../redux";
import {objAreEqual} from '../helpers/misc';
import {useDispatch, useSelector} from "react-redux";
import {useSubmit} from "../hook";
import {Button, TextField} from "@material-ui/core";

//使用方法与formik类似:
// Field默认as={TextField}
//Field 组件
// as, name属性与formik相应属性类似(必须添加)
// label属性用于添加TextField 标签,如果重置as属性则无需添加
// formName属性指定表单名,用于从redux/index.js selects 获取相应selects(必须添加
// 如果相应的redux slice使用了field,
// 如果Field 某个属性为组件,则必须为该组件添加key或id属性用于数据对比
// TODO:
// slice必须添加字段 form{},errors:{}
// 则该slice必须添加三个action:
//  changeFormField(state, action) { },
//  changeFormError(state, action) { },
//  clearFormError(state) { }
// 且changeFormField 与相应slice selcet必须从 redux/index 导出
//SubmitBtn用于提交 必须传入handleOnSubmit属性,用于处理提交
//CommonBtn 用于处理路由跳转等其他功能

const areEqual = (pre, next) => {
  const blacklist = ['cacheBusterProp', 'as'];
  return objAreEqual(pre, next, blacklist);
};

const Field = React.memo(function Field(props) {
  const {as, label, name, formName, getValue, children, ...rest} = props;
  const {errors, form} = useSelector(selects[formName]);
  const value = useMemo(() => {
    return form[name];
  }, [form, name]);

  const error = useMemo(() => {
    const field = errors['name'];
    const value = errors['value'];
    return {
      text: value,
      isError: field === name
    };
  }, [errors, name]);
  return <ContextField {...{as, label, name, formName, value, error, getValue, children, ...rest}}/>;
}, areEqual);


const ContextField = React.memo(function ContextField(props) {
  const {as, label, name, formName, getValue, children, value, error, ...rest} = props;
  const dispatch = useDispatch();
  const changeFormField = useCallback((props) => {
    return _changeFormField[formName](props);
  }, [formName]);

  const handleFormChange = useCallback((e, other) => {
    let value;
    if (getValue) {
      value = getValue(e, other);
    } else {
      value = e.target.value;
    }
    dispatch(changeFormField({name, value}));
  }, [changeFormField, dispatch, getValue, name]);

  if (as) {
    return React.createElement(
      as,
      {value, onChange: handleFormChange, label, ...rest},
      children
    );
  }
  return (
    <TextField
      value={value}
      onChange={handleFormChange}
      label={label}
      color="primary"
      fullWidth={true}
      variant={"outlined"}
      error={error.isError}
      helperText={error.text}
      {...rest}
    />
  );
}, areEqual);

const SubmitBtn = React.memo(function SubmitBtn(props) {
  const {children, formName, hookParam, as, ...rest} = props;
  const onSubmit = useSubmit(formName, hookParam);
  if (as) {
    return React.createElement(
      as,
      {onClick: onSubmit, ...rest},
      children
    );
  }
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onSubmit}
      {...rest}
    >
      {children}
    </Button>
  );
}, areEqual);

const CommonBtn = React.memo(function CommonBtn({children, ...props}) {
  return (
    <Button
      {...props}
    >
      {children}
    </Button>
  );
});
export {Field, SubmitBtn, CommonBtn};
