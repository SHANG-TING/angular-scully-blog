---
title: CSS all Property
tags:
    - css
description: 實作過程的紀錄 & 備忘錄
image: https://i.imgur.com/YKqw5X5.png
author: 謝尚庭 Neil
published: true
---

# 自己對 CSS all Property 的理解

## unset

```css
blockquote {
  all: unset;
}
```

<iframe class="sample-code-frame" id="frame_ex1" width="200" height="125" src="https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/CSS/all/_samples_/ex1" loading="lazy"></iframe>

`不使用`瀏覽器預設給的樣式，只有`部分繼承` Parent DOM Element 的樣式。

我發現 display: inline 的話，這是因為 display 的預設值是 inline (Initial Value) 的關係，它是一個 inline element。

還會發現 background-color: transparent 的話，這是因為 background-color 的預設值是 transparent (Initial Value)。

以及發現 font-size: small 以及 color: blue 都是 Parent DOM Element 所提供的值 (Inherit Value)，這是因為 font-size、color 這2個 property 瀏覽器預設就是會被繼承的關係。

> font-size、color 這 2 個 CSS Property，會被繼承（這是瀏覽器預設的）

## initial

```css
blockquote {
  all: initial;
}
```

<iframe class="sample-code-frame" id="frame_ex2" width="200" height="125" src="https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/CSS/all/_samples_/ex2" loading="lazy"></iframe>

`不使用`瀏覽器預設給的樣式，也`不繼承` Parent DOM Element 的樣式。

我發現 display: inline 的話，這是因為 display 的預設值是 inline (Initial Value) 的關係，它會是一個 inline element。

以及發現 background-color: transparent、font-size: normal、color: black 都是吃瀏覽器所提供的預設值 (Initial Value)。

## inherit

```css
blockquote {
  all: inherit;
}
```

<iframe class="sample-code-frame" id="frame_ex3" width="200" height="125" src="https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/CSS/all/_samples_/ex3" loading="lazy"></iframe>

`不使用`瀏覽器預設給的樣式，並`繼承` Parent DOM Element 的樣式。

我發現 display 為 block 的話，就是基於 Parent DOM Element 的關係，連同 background-color: #f0f0f0、font-size: small、color: blue 都是吃 Parent DOM Element 提供的值 (Inherit Value)。

## 參考資料

- <https://developer.mozilla.org/en-US/docs/Web/CSS/all>

- [CSS background-color Property](https://www.w3schools.com/cssref/pr_background-color.asp)
  - Default value 為 transparent
  - Inherited 為 no

- [CSS font-size Property](https://www.w3schools.com/cssref/pr_font_font-size.asp)
  - Default value 為 medium
  - Inherited 為 yes

- [CSS color Property](https://www.w3schools.com/cssref/pr_text_color.asp)
  - Default value 為 not specified
  - Inherited 為 yes
