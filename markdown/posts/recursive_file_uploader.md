---
title: '透過 JavaScript 實現遞迴取得檔案資訊'
tags: 
  - javascript
description: 透過 File System Access API 來實作此功能，也透過 File and Directory Entries API 提供的 DataTransferItem.webkitGetAsEntry() 來實作，最後嘗試在 input element 加入　webkitdirectory 屬性來實現其功能。
author: 謝尚庭 Neil
date: 2021/04/28
published: true
---

# 透過 JavaScript 實現遞迴取得檔案資訊

## 方法一、透過 File System Access API 來實作

### 核心程式碼

```javascript
async function recursive(parent, path = '') {
  let files = [];

  for await (const [name, handler] of parent.entries()) {
    const filepath = `${path}/${name}`

    if (handler.kind === "directory") {
      files = files.concat(await recursive(handler, filepath));
      continue;
    }

    const file = await handler.getFile();
    file.filepath = filepath;
    files.push(file);
  }

  return files;
}

(async () => {
  const root = await window.showDirectoryPicker();
  const files = await recursive(root, root.name);
  console.log(files);
})();
```

### 使用說明

#### 1. 可以直接在瀏覽器按 F12 開啟 DevTools，且在 console 貼上上述程式碼並執行就可以了~

#### 2. 請選擇指定資料夾

![image](https://i.imgur.com/gqUmEF1.png)

#### 3. 請點擊「查看檔案」來允許網站查看檔案

![image](https://i.imgur.com/8N7HtAD.png)

#### 4. 可以看到資料夾下所有的檔案

![image](https://i.imgur.com/F7pAyS6.png)

## 方法二、透過 File and Directory Entries API 提供的 DataTransferItem.webkitGetAsEntry() 來實作

### 核心程式碼

- index.js

```javascript
const getFilesFromEntry = async (entry, path = "") =>
  entry.isDirectory
    ? await readDir(entry, path)
    : [await readFile(entry, path)];

const readFile = (entry, path = "") => {
  return new Promise((resolve, reject) => {
    entry.file((file) => {
      file.filepath = path + file.name;
      resolve(file);
    }, reject);
  });
};

const readDir = async (entry, path) => {
  const dirReader = entry.createReader();
  const newPath = `${path + entry.name}/`;

  let files = [];
  let newFiles;

  do {
    newFiles = await dirReadEntries(dirReader, newPath);
    files = files.concat(newFiles);
  } while (newFiles.length > 0);

  return files;
};

const dirReadEntries = (dirReader, path) => {
  return new Promise((resolve, reject) => {
    dirReader.readEntries(async (entries) => {
      let files = [];
      for (let entry of entries) {
        const itemFiles = await getFilesFromEntry(entry, path);
        files = files.concat(itemFiles);
      }
      resolve(files);
    }, reject);
  });
};
```

- index.html

```html
<html>
  <body>
    <div
      class="drop-area"
      style="width: 500px; height: 500px; border: solid black 2px"
    >
      drag & drop files/directories here and check logs in dev console
    </div>

    <script src="index.js"></script>
    <script>
      const dropArea = document.querySelector(".drop-area");
      dropArea.addEventListener("dragover", (evt) => evt.preventDefault());
      dropArea.addEventListener("drop", async (evt) => {
        evt.preventDefault();
        
        const entries = Array.from(evt.dataTransfer.items).map((item) =>
          item.webkitGetAsEntry()
        );

        let files = [];
        for (const entry of entries) {
          files = files.concat(await getFilesFromEntry(entry));
        }

        console.log(files);
      });
    </script>
  </body>
</html>
```

### Demo

<iframe width="100%" height="450px" src="https://stackblitz.com/edit/drag-transfer-items?embed=1&file=index.js"></iframe>

## 方法三、透過在 input element 加入 [webkitdirectory](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-webkitdirectory) 屬性，來取得指定資料夾下的所有檔案

在指定資料夾中的每個 File 物件都會有 [webkitRelativePath](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory) 屬性，會提供 File 物件在指定資料夾內的相對路徑 (*src/app/app.component.ts*)。

### HTML

```html
<input type="file" id="filepicker" name="fileList" webkitdirectory multiple />
<ul id="listing"></ul>
```

### JavaScript

```javascript
document.getElementById("filepicker").addEventListener("change", function(event) {
  let output = document.getElementById("listing");
  let files = event.target.files;

  for (let i=0; i<files.length; i++) {
    let item = document.createElement("li");
    item.innerHTML = files[i].webkitRelativePath;
    output.appendChild(item);
  };
}, false);
```

### Result

<iframe id="webkitdirectory_example" src="https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/API/HTMLInputElement/webkitdirectory/_samples_/Example" loading="lazy"></iframe>


### 簡單心得
  
  我們可以讓網站同時支援第二、三種的上傳檔案方式，讓上傳功能更加強大。
  
  另外有再寫 Angular 的朋友，我推薦我朋友 [Alan Zou](https://github.com/ZouYouShun) 所開發的 [ngxf-uploader](https://github.com/ZouYouShun/ngxf-uploader) (Angular Library)，最近它也即將支援`資料夾上傳`功能，可以查看 [PR: feat(ngxf-uploader): support folder upload](https://github.com/ZouYouShun/ngxf-uploader/pull/9)。
  
  我也非常榮幸可以提供想法給 Alan Zou。
  
  > 提醒一下，以上三種上傳方式都不支援 IE 瀏覽器喔！

## 參考資料

- <https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API>
- <https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry>
- <https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory>
