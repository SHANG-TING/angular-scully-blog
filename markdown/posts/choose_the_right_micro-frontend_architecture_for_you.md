---
title: 選擇適合自己的微前端架構
description: 微前端是一種 `Web 開發技術`：是一種 `SOA 架構模式`的變體，它將一個應用分解成一組鬆耦合的服務，在微前端架構中，服務之間它是`細粒度`的，並且它們之間的協議是`輕量級`的，由於將一個應用拆分成一些小的服務，使得它們易於理解、開發、測試，這樣能夠讓不同團隊獨立開發、部署、拓展他們的服務，這是微服務一個很重要的概念。
image: https://i.imgur.com/XMEbuEt.png
tags: 
  - angular
  - micro-frontend
author: 謝尚庭 Neil
date: 2020/06/26
published: true
---

## 最重要的兩個核心

1. 可獨立交付的前端應用，一定是一組或者多個可獨立交付的前端應用
2. 最關鍵的就是組成一個更大的整體

> 所以就圍繞著怎麼將多個團隊獨立交付的前端應用組合成一個統一的前端平台

## 微前端來自微服務

微前端是一種 `Web 開發技術`：是一種 `SOA 架構模式`的變體，它將一個應用分解成一組鬆耦合的服務，在微前端架構中，服務之間它是`細粒度`的，並且它們之間的協議是`輕量級`的，由於將一個應用拆分成一些小的服務，使得它們易於理解、開發、測試，這樣能夠讓不同團隊獨立開發、部署、拓展他們的服務，這是微服務一個很重要的概念。

> 實際上是先有微服務這個概念，微前端更多的是借鑑了微服務的一個理念延伸出來的

## 隨著前端業務複雜度越來越高，多團隊多產品組成的大型平台的應用越來越多

### 第一種情況

- 產品功能越來越多
- 團隊越來越大

### 第二種情況

- 康威定律
  <https://zh.wikipedia.org/wiki/康威定律>

> 設計系統的架構受制於產生這些設計的組織的溝通結構

由於功能或產品越來越複雜，實際上就會按照業務特點進行一些架構上的設計，從而會誕生相關的組織。

比如有一個大型的管理系統．有訂單、報表、配置、策略的系統，隨著規模越來越大，必然會誕生相對應的團隊。

而越來越多的團隊會越來越要求獨立化的引進一個產品，最後將多個獨立交付的前端產品整合成一個整體，這也是主要微前端解決的問題。

## 前端協作模式的分類

- 開發模式
  - 多個 APP、Library 獨立開發
- 協作模式
  - 不同團隊都擁有不同的 APP、Library
- 打包與部署
  - 各自 APP、Library 獨立打包與部署
- 業務場景
  - 多團隊，業務複雜、業務相關程式碼非常多
- 開發體驗
  - 開發，打包，部署分離，運行時整合

## 前端整合的分類

### 1. 服務端渲染模板整合

![image](https://i.imgur.com/qdP5Ezb.png)

### 2. 打包時整合 Single-SPA, Mooa (主從模式)

![image](https://phodal.github.io/mooa/docs/mooa.png)

> 圖片來源 <https://github.com/phodal/mooa>

## 前端整合方式的分類

### Iframe + postMessage

![image](https://www.einfochips.com/blog/wp-content/uploads/2016/07/iframe-figure3.png)

> [image](https://www.einfochips.com/blog/using-iframe-for-cross-domain-communication-in-enterprise-networks/)

### 在瀏覽器上運行時，透過 javascript 去整合 (web components, AMP, jQuery plugins via cdn, angular elements...)

![image](https://bs-uploads.toptal.io/blackfish-uploads/uploaded_file/file/57219/image-1570616238950-e2a18963217427699df3de4d2be7bea5.png)

> [圖片來源](https://www.toptal.com/front-end/micro-frontends-strengths-benefits)

*關於 Iframe 特別想補充一點，只要業務場景足夠的隔離且簡單，其實有的時候這會一個很好的選擇，它其實用更低的成本能做出更好的效果，其實這就是我想強調的一句話「沒有最好的微前端架構，只有最適合的微前端架構」。*

## 微前端幾種模式的關鍵點：SPA 與 MPA

![image](https://i.imgur.com/WNr1pmp.png)

### 傳統的單頁應用模式(SPA, Single-page Application)

![image](https://enterprisemonkey.com.au/wp-content/uploads/2018/06/spa-lifecycle.png)

> [圖片來源](https://enterprisemonkey.com.au/blog/single-page-apps-vs-multiple-page-apps)

### 傳統的多頁應用模式(MPA, Multi-page Application)

![image](https://enterprisemonkey.com.au/wp-content/uploads/2018/06/mpa-lifecycle.png)

> [圖片來源](https://enterprisemonkey.com.au/blog/single-page-apps-vs-multiple-page-apps)

### ⭐ 由多個 SPA 組成的 MPA

**不提供統一的基座，透過機制與規範，讓用戶只感覺得到一個產品。**

也就是由多個 SPA 組合成 MPA，他們會有一個共享的，一個無論是組件、封裝業務邏輯的服務、還是一個生命週期管理或者共同的行為，主要是讓大家透過無論是體驗交互上的一致，或者說設計上的一致，以及一些上下文的管理、生命週期的管理和通信機制的管理，讓這些形成一個有機的整體。

![image](https://i.imgur.com/XMEbuEt.png)

## 推薦的微前端框架套件

### ngx-planet

- A single SPA Utils for Angular 2+
- <https://github.com/worktile/ngx-planet>

### mooa

- A single SPA Utils for Angular 2+
- <https://github.com/phodal/mooa>

### single-spa

- A javascript framework for front-end micro-services
- <https://github.com/single-spa/single-spa>

## 總結

如何去選擇自己想要的微前端，以下四點非常重要的因素

- 團隊規模
  - 團隊紀律
  - 團隊10人或者100人↑

- 工程能力
  - 版本管理的能力
  - CI/CD的能力

- 開發協作的方式
  - 採取 monorepo 的專案架構開發
  - 有人負責 UI，有人負責業務邏輯等等

- 業務類型
  - 每個服務可能需要完全獨立或者是完全耦合的

## 參考資料

- <https://medium.com/@tomsoderlund/micro-frontends-a-microservice-approach-to-front-end-web-development-f325ebdadc16>
- <https://enterprisemonkey.com.au/blog/single-page-apps-vs-multiple-page-apps>
- <https://www.toptal.com/front-end/micro-frontends-strengths-benefits>
