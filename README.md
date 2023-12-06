## 配置如下
+ 使用了 arco design 组件库（目前使用的时完整引入，优化时按需引入）
+ 使用 vue-cli 脚手架初始化项目
+ 使用 vuex 来管理全局状态信息
+ 使用 axios 请求库
+ 使用 OpenAPI Typescript Codegen 配合axios自动生成请求 ts 类型定义和请求调用
  + 安装```yarn add openapi-typescript-codegen --dev```
  + 使用```openapi --input http://localhost:9001/api/v2/api-docs --output ./src/api --client axios```