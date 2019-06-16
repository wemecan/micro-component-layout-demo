# Micro Component Templete 微组件模板

> 使用此模板为微门户 (Micro Portal) 开发组件

## 基本思路

因Vue Router 支持异步组件, 将组件编译为UMD模块, 上传至CDN, 通过配置组件的链接与内存地址, 实现组件的动态变换.


## 项目设置
```shell
$ git clone https://github.com/myWsq/micro-component-templete.git
$ cd micro-component-templete
$ yarn # or npm install
```
开发前, 首先要明确当前项目的`namespace`, 一般情况下就是`package.json`的`name`字段. 根据当前的项目进行修改.

```json
// package.json
{
    "name":"foo"
    ...
}
```

一个项目可以编译出多个相互独立的微组件, 在`src/components`文件夹下新建组件并在`index.ts`中导出.

### Play

```shell
$ yarn serve
```

项目会识别`src/components/index.ts`中导出的组件并自动生成路由与导航.

### Build

```shell
$ yarn build
```
微门户会根据配置引入组件的脚本与样式文件. `{namespace}.{componentMame}` 即为组件的内存地址(path)

注意: 为了及时更新组件缓存与控制组件版本, 编译出的UMD模块文件名应含有版本号.

```shell
$ yarn build --filename foo@0.0.1
```

此方法为组件回滚机制提供了有效途径.

### Deploy

组件的发布很简单, 将编译出的UMD模块上传至CDN, 更新微门户的配置即可. 发布时, 需要填写组件的脚本文件链接, 样式文件链接(可选), 组件内存地址.

## Tip

微组件是独立开发, 独立编译, 独立部署的, 但是由于组件将嵌套在微门户内, 需要约定一些特性.

### Router

Playground中同样注入了`vue-router`, 需要注意的是, 开发阶段的路由实例与微门户环境不同, 使用`vm.$router`或`vm.$route`时需特别注意, 以微门户为主.

### 依赖

通用第三方依赖版本应与微门户使用的依赖版本相同, 使用新特性时, 需要查阅微门户依赖版本. 

