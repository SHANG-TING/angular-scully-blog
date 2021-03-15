---
title: '簡單建立一個基於 Angular 專案的 Chrome Extension'
tags: 
  - angular
  - chrome-extension
description: 透過 Angular CLI 幫我們產生專案，再手動加入 manifest.json，且透過 ng build 建置與打包程式碼並上傳到 chrome://extensions 的未封裝項目上
author: 謝尚庭 Neil
date: 2019/06/26
published: true
---

# 簡單建立一個基於 Angular 專案的 Chrome Extension

- 建立一個 Angular 專案

```shell
ng new ngChromeExtension --routing=false --style=scss
```

- 建立一個 manifest.json 在 src 目錄下

```json
{
    "name": "ngChromeExtension",
    "version": "1.0",
    "description": "Build an Extension with Angular",
    "manifest_version": 2,
    "browser_action": {
        "default_popup": "index.html"
    }
}
```

- 加入 manifest.json 檔案路徑 到 assets

```json
 "build": {
   "builder": "@angular-devkit/build-angular:browser",
   "options": {
   "outputPath": "dist/ngChromeExtension",
   "index": "src/index.html",
   "main": "src/main.ts",
   "polyfills": "src/polyfills.ts",
   "tsConfig": "tsconfig.app.json",
   "aot": true,
   "assets": [
    "src/assets/favicon.ico",
    "src/assets",
    "src/manifest.json" // Chrome manifest goes in root directory
   ],
```

- 建置專案

```shell
npm run build -- --prod
```

- 到 [chrome://extensions](chrome://extensions) 按下 Load Unpack 按鈕
![image](https://i.imgur.com/DtHzowv.png)

- 選擇 dist/ngChromeExtension 資料夾
![image](https://i.imgur.com/9wzTwzv.png)

- 成功上傳到 [chrome://extensions](chrome://extensions)
![image](https://i.imgur.com/QwfDlJv.png)

- 使用 ngChromeExtension
![image](https://i.imgur.com/VpZ8vGy.png)
![image](https://i.imgur.com/QnTNt0B.png)

- 參考資料
  - <https://developer.chrome.com/docs/extensions/mv2/getstarted/>
