---
title: 自己對 CSS all Property 的理解
tags:
    - css
description: 實作過程的紀錄 & 備忘錄
author: 謝尚庭 Neil
date: 2020/03/26
published: true
---

## unset

```css
blockquote {
  all: unset;
}
```

`不使用`瀏覽器預設給的樣式，只有`部分繼承` Parent DOM Element 的樣式。

<iframe class="sample-code-frame" id="frame_ex1"  height="125" src="https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/CSS/all/_sample_.allunset.html" loading="lazy"></iframe>

首先 display、background-color 在瀏覽器是預設不會被繼承 (Inherited: no)，所以 blockquote 會吃到 display 的預設值 (inline) 以及 background-color 的預設值 (transparent)。

> display、background-color 這 2 個 CSS Property，**不會**被繼承（這是瀏覽器預設的）

則 font-size、color 在瀏覽器預設是預設會被繼承 (Inherited: yes)，因此 blockquote 會吃到從 body 繼承下來 font-size 的繼承值 (small) 以及 color 的繼承值 (blue)。

> font-size、color 這 2 個 CSS Property，**會**被繼承（這是瀏覽器預設的）

## initial

```css
blockquote {
  all: initial;
}
```

`不使用`瀏覽器預設給的樣式，也`不繼承` Parent DOM Element 的樣式。

<iframe class="sample-code-frame" id="frame_ex2"  height="125" src="https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/CSS/all/_sample_.allinitial.html" loading="lazy"></iframe>

總之 blockquote 的 display、background-color、font-size、color 都是吃瀏覽器所提供的預設值。

- display: inline
- background-color: transparent
- font-size: normal
- color: black

## inherit

```css
blockquote {
  all: inherit;
}
```

`不使用`瀏覽器預設給的樣式，並`繼承` Parent DOM Element 的樣式。

<iframe class="sample-code-frame" id="frame_ex3"  height="125" src="https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/CSS/all/_sample_.allinherit.html" loading="lazy"></iframe>


總之 blockquote 的 display、background-color、font-size、color 都是繼承 body 來的繼承值。

- display: block
- background-color: #f0f0f0
- font-size: small
- color: blue

## 參考資料

- <https://developer.mozilla.org/en-US/docs/Web/CSS/all>

- [CSS display Property](https://www.w3schools.com/cssref/pr_class_display.asp)
  - Default value 為 inline
  - Inherited 為 no

- [CSS background-color Property](https://www.w3schools.com/cssref/pr_background-color.asp)
  - Default value 為 transparent
  - Inherited 為 no

- [CSS font-size Property](https://www.w3schools.com/cssref/pr_font_font-size.asp)
  - Default value 為 medium
  - Inherited 為 yes

- [CSS color Property](https://www.w3schools.com/cssref/pr_text_color.asp)
  - Default value 為 not specified
  - Inherited 為 yes
