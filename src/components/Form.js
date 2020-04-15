import React, {useCallback, useMemo} from 'react';
import {changeFormField, selectForm} from "../redux/formSlice";
// import {objAreEqual} from '../helpers/misc';
import {useDispatch, useSelector} from "react-redux";
import {useSubmit} from "../hook";
import {Button, TextField} from "@material-ui/core";

//使用方法与formik类似:
// Field默认as={TextField}
//Field 组件
// as, name属性与formik相应属性类似(必须添加)
// label属性用于添加TextField 标签,如果重置as属性则无需添加
// formName属性指定表单名,用于从redux/formSlice.js selects 获取相应selects(必须添加
// 如果相应的redux slice使用了field,
// 如果Field 某个属性为组件,则必须为该组件添加key或id属性用于数据对比
// slice必须添加字段 form{},errors:{}
// 则该slice必须添加三个action:
//  changeFormField(state, action) { },
//  changeFormError(state, action) { },
//  clearFormError(state) { }
// 且changeFormField 与相应slice selcet必须从 redux/index 导出
//SubmitBtn用于提交 必须传入handleOnSubmit属性,用于处理提交
//CommonBtn 用于处理路由跳转等其他功能
//
// const areEqual = (pre, next) => {
//   const blacklist = ['cacheBusterProp', 'as'];
//   return objAreEqual(pre, next, blacklist);
// };

const Field = React.memo(function Field(props) {
  const {as, label, name, formName, getValue, children, ...rest} = props;
  const {errors, [formName]: form} = useSelector(selectForm);
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
}, () => {
  return true;
});


const ContextField = React.memo(function ContextField(props) {
  const {as, label, name, formName, getValue, children, value, error, ...rest} = props;
  const dispatch = useDispatch();

  const handleFormChange = useCallback((e, other) => {
    let value;
    if (getValue) {
      value = getValue(e, other);
    } else {
      value = e.target.value;
    }
    dispatch(changeFormField({[name]: value, form: formName}));
  }, [dispatch, formName, getValue, name]);

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
      error={error.isError}
      helperText={error.text}
      {...rest}
    />
  );
}, (pre, next) => {
  return pre.getValue === next.getValue &&
    pre.value === next.value &&
    pre.error === next.error;
});

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
      color="primary"
      onClick={onSubmit}
      {...rest}
    >
      {children}
    </Button>
  );
}, (pre, next) => {
  return pre.hookParam === next.hookParam;
});


export {Field, SubmitBtn};
