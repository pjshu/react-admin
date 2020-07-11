
## 配置
- src/config/security.js
    - dsn sentry.io 错误处理集成
    - max_upload_image_length 同时上传图片最大数量
- src/config/security_api.js
    - api_security_string 添加该配置用于加密部分api

## 使用
```bash
# yarn
yarn  && yarn pro_build
# npm
npm install && npm run pro_build
```

## api
- https://github.com/pjshu/react-blog 

## 你可能需要:
- 博客页面
    - https://github.com/pjshu/flask-blog
- 后台管理面板
    - https://github.com/pjshu/react-admin


## TODO:
- 支持markdown与富文本切换(参考掘金)
- 上传被修改的字段
- 日志查询
- 消息自动清除(超过一定数量)
- 文章加密功能
- 文章回收站(防止手贱删除)
- 支持手机绑定
- 文章上传时,表单验证错误信息提示
- 路由跳转前询问是否保存文章
- 记录字数


- 添加配置页面(react,flask)
- - react: 
    2. markdown开启/关闭 
    3. 表情包配置 
    4. 最大同时上传图片数量
    5. 用户信息:github/twitter/email...
    6. logo
   

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting


### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment
