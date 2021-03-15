---
title: 關於 comma operator 的使用觀念與技巧
tags:
    - javascript
    - comma operator
description: 實作過程的紀錄 & 備忘錄
author: 謝尚庭 Neil
date: 2019/02/03
published: true
---

## 觀念

對它的每個操作目標求值（從左至右），並回傳最後一個操作目標的值。

```javascript
function myFunc() {
  let x = 0;

  return (x += 1, x); // the same of return ++x;
}

myFunc(); // 1
```

## 技巧一、簡化寫法

可以透過 comma operator 簡化寫法

```javascript
let x = Promise.resolve(1);
let y = Promise.resolve(2);

// let z = x
//   .then(x => x + 1)
//   .then(async x => x + await y);

let z = x
  .then(async x => (x++, x + await y));

await z; // 3
```

## 技巧二、(0, obj.prop)(...args)

這個技巧的特別之處，透過 comma operator 的特性來讓 this 指向全局對象，也就是 window 或者 global。

```javascript
const neil = {
  say(message) {
    this.alert(message);
  },
  alert: console.log
};

// this === neil
neil.say('Dr.D is god!');

// this === window
(0, neil.say)('Dr.D is god!');
```

![image](https://scontent.ftpe8-4.fna.fbcdn.net/v/t1.0-9/161408850_3727975163964467_2951647070574817289_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=dbeb18&_nc_ohc=hRxmfrPtg-4AX-Zk7jm&_nc_ht=scontent.ftpe8-4.fna&oh=2d9636ea8eb0fe72dad035fd10ab731e&oe=607EAB1C)

> 建議還是使用 `function.call()/apply()` 來改變 this 的指向

## 參考資料

- <https://2ality.com/2015/12/references.html>
