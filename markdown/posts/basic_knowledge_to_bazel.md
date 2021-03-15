---
title: 'Bazel 的基本認識'
tags: 
  - bazel
description: 瞭解 Bazel 是什麼？ Bazel 的定位是什麼？ Bazel 具有什麼優勢？
image: https://bazel.build/images/bazel-og-image.png
author: 謝尚庭 Neil
date: 2020/12/26
published: true
---

## Bazel 是什麼?

- A Build Tool (通常基於大型 monorepo)
    它除了是一個 Build Tool 之外，更是一個 `Build Tool Coordinator`。

    ![image](https://i.imgur.com/VKQ7YGH.jpg)
    > 圖片來源 <https://www.slideshare.net/7PeaksSoftware/abc-angular-bazel-cli>

- Incremental (只構建每次變動的部分)
- 它可以在任何框架和程式語言上工作
- Scalable (可以透過多台電腦資源進行平行運算)

## Bazel 的定位是什麼?

![image](https://i.imgur.com/2ABB2FE.png)
> by AlexEagle at ng-conf 2019

其實它就像 Gulp 一樣，Bazel 本身不是真正在進行 Compile 或 Bundle 的工具主體。

它使用了當前現有的工具，來完成相關打包任務，而且 Bazel 正在擔任 coordinator 來管理這些依賴關係、這些工具的關係，並使他們一起工作。

從這個角度來看，Bazel 與 Gulp 類似

## 對於一個好的 Build Tool 的要求

- 基本要求:
  - Correct (正確性)
    確保每次構建完成的正確性，且我們不需要關心環境問題。
    - Bazel使用沙箱隔離環境
    - 沙盒支持Linux和Mac（不支持某些功能）
    - Bazel 在 windows 上工作，新的 ws 輸出也支持一些沙箱
  - Fast (快速完成 Compile)
    - Incremental
      只建置含測試更改的部分、更新後的部分、受影響的部分，而不是從頭建置到尾。
    - Parallelism
      還能利用雲的力量，要進行打包測試的集群，可以實現平行處理。
    - Predictable (可預測的)
      - same input -> same output

    - Reusable (重複使用已編譯完成的結果)
      - build rule/task can be composed and reused

- 額外要求:
  - Universal (通用性)
    - Bazel不依賴任何指定的框架或語言，可以構建任何東西。
    - Bazel是一個完美的構建工具，可用於在mono repo中進行全棧開發。

- 參考資料
  - <https://docs.bazel.build/versions/master/build-javascript.html>
  - <https://www.npmjs.com/package/@bazel/typescript>
  - <https://www.youtube.com/watch?v=J1lnp-nU4wM>
