<!--
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2022-11-21 09:40:30
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-03 14:13:35
 * @FilePath: \electron-app\README.md
-->
# electron-app

An Electron application with Vue and TypesSript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## 目录结构
```
electron-app
├── README.md  
├── build                    # 不同平台的图标和配置
├── dev-app-update.yml       # 开发环境update配置
├── dist                     # 打包输出目录
├── electron-builder.yml     # 打包配置文件
├── electron.vite.config.ts  # vite配置文件
├── env.d.ts
├── node_modules
├── out                      # vite打包渲染的目录
├── package-lock.json
├── package.json
├── resources                # 主进程静态资源
├── src
│  ├──main                   # 主进程代码
│  ├──preload                # 预加载脚本
│  └──renderer               # 渲染器基于 Vue, React 等开发
├── tsconfig.json
├── tsconfig.node.json
└── tsconfig.web.json

```

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```


### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
