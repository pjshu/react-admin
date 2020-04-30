import {array, number, object, ref, string} from "yup";
import {FORM} from "../redux/formSlice";
//TODO
const validatePost = object({
  id: number()
    .min(0, 'id不能小于0')
    .required('id不能为空'),
  title: string()
    .ensure(),
  tags: array(),
  visibility: string()
    .matches(/(私密|公开)/),
  excerpt: string()
    // .required('请输入摘录')
    .max(300, '摘录不超过300字'),
  article: string()
    .ensure(),
});

const validateUserInfo = object({
  username: string()
    .max(128, '用户名不能超过128位')
    .required('请输入用户名'),
  nickname: string()
    .max(128, '昵称不能超过128位')
    .required('请输入昵称'),
});

const validateLogin = object({
  username: string()
    .max('30', '用户名不能超过30位')
    .required('请输入用户名'),
  password: string()
    .max('30', '密码不能超过30位')
    .required('请输入密码')
});

const validateRecoveryPassword = object({
  // email: string()
  //   .email('请输入正确的邮箱格式')
  //   .required('请输入邮箱'),
  code: string()
    .required('请输入验证码'),
  password: string()
    .max('30', '密码不能超过30位')
    .required('请输入密码'),
  confirm_password: string()
    .oneOf([ref('password'), null], "密码不匹配")
    .max('30', '密码不能超过30位')
    .required('请确认密码'),
});

const validateResetEmail = object({
  email: string()
    .email('请输入正确的邮箱格式')
    .required('请输入邮箱'),
  code: string()
    .required('请输入验证码')
});
const validateResetPassword = object({
  old_password: string()
    .max('30', '密码不能超过30位')
    .required('请输入旧密码'),
  password: string()
    .max('30', '密码不能超过30位')
    .required('请输入密码'),
  confirm_password: string()
    .oneOf([ref('password'), null], "密码不匹配")
    .max('30', '密码不能超过30位')
    .required('请确认密码'),
});
const validateRegister = object({
  username: string()
    .max(128, '用户名不能超过128位')
    .required('请输入用户名'),
  nickname: string()
    .max(128, '昵称不能超过128位')
    .required('请输入昵称'),
  password: string()
    .min(6, '密码至少六位')
    .max(20, '密码不能超过30位')
    .required('请输入密码'),
  confirm_password: string()
    .oneOf([ref('password'), null], "密码不匹配")
    .min(6, '密码至少六位')
    .max(20, '密码不能超过30位')
    .required('请确认密码'),
  email: string()
    .email('请输入正确的邮箱格式')
});

const validateTag = object({
  id: number()
    .min(0, 'id不能小于0')
    .required('id不能为空'),
  name: string()
    .max(64, '标签名最多64个字符')
    .required('标签名不能为空'),
  describe: string()
    .max(128, '描述最多128个字符'),
  count: number()
    .required('count不能为空'),
});

const validateEmail = object({
  email: string()
    .email('请输入正确的邮箱格式')
    .required('请输入邮箱'),
});

export {
  validatePost,
  validateUserInfo,
  validateLogin,
  validateRecoveryPassword,
  validateResetEmail,
  validateResetPassword,
  validateRegister,
  validateTag,
  validateEmail
};

export const validations = {
  [FORM.post]: validatePost,
  [FORM.login]: validateLogin,
  [FORM.resetPassword]: validateResetPassword,
  [FORM.userInfo]: validateUserInfo,
  [FORM.tags]: validateTag,
  [FORM.register]: validateRegister,
  [FORM.resetEmail]: validateResetEmail,
  [FORM.recoveryPasswordSendCode]: validateEmail,
  [FORM.recoveryPassword]: validateRecoveryPassword
};
