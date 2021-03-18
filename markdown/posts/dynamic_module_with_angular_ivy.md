---
title: 基於 Angular Ivy 的 Lazy-Load Module (dynamic import) 使用方法
tags:
    - angular
    - ivy
description: 實作過程的紀錄 & 備忘錄
author: 謝尚庭 Neil
date: 2020/04/01
published: true
---

## 基於 Angular Ivy 的 Lazy-Load Module (dynamic import) 使用方法

基本上都是透過使用 `import` 來載入指定模組，並透過 Compiler 取得對應的 ComponentFactory，再透過 ViewContainerRef 的 createComponent 方法來實作 ComponentFactory 並產生 Component 在畫面上。

## 環境確認

![image](https://i.imgur.com/nA3deCy.png)

## 建立專案

```shell
ng new lazy-ng-module --minimal
ng g m module1
ng g c module1/m1comp1 --flat -s -t --skip-tests
ng g c module1/m1comp2 --flat -s -t --skip-tests
```

## 第一種寫法

這邊主要跟之前的寫法差不多，透過　componentResolver.resolveComponentFactory(ComponentType) 來取得 ComponentFactory。

```typescript
import { AfterViewInit, Compiler, Component, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { M1comp1Component } from './module1/m1comp1.component';
import { M1comp2Component } from './module1/m1comp2.component';

@Component({
  selector: 'app-root',
  template: `<ng-container #anchor></ng-container>`
})
export class AppComponent implements AfterViewInit {
  @ViewChild('anchor', { read: ViewContainerRef }) anchor: ViewContainerRef;
  
  constructor(private compiler: Compiler, private injector: Injector) {}

  async ngAfterViewInit() {
    const { Module1Module } = await import('./module1/module1.module'));
    const { componentFactoryResolver } = moduleFactory.create(this.injector);
    const componentFactories = [
      componentFactoryResolver.resolveComponentFactory(M1comp1Component),
      componentFactoryResolver.resolveComponentFactory(M1comp2Component)
    ];

    for(const factory of componentFactories) {
      this.anchor.createComponent(factory);
    }
  }
}
```

## 第二種寫法

Compiler 有 `compileModulesAndComponents` 兩種方法，這提供我們取得到　Module1 所引用到的 Components (M1comp1Component、M1comp2Component) 的 `ComponentFactories` (ComponentFactory Array)。

這也就是說連 ComponentType 都不用知道，因此也不需要寫 *import { M1comp1Component } from './module1/m1comp1.component';* 這樣的程式碼來得知 ComponentType。

我們可以直接拿 ComponentFactories 來生成這些 Component，另外它已經是一個陣列，所以可以做 filter 等等動作，也可以直接在畫面上 ngFor 產生一個列表，可以讓使用者選擇要實作哪一個 ComponentFactory。

```typescript
import { AfterViewInit, Compiler, Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<ng-container #anchor></ng-container>`
})
export class AppComponent implements AfterViewInit {
  @ViewChild('anchor', { read: ViewContainerRef }) anchor: ViewContainerRef;
  
  constructor(private compiler: Compiler) {}

  async ngAfterViewInit() {
    const { Module1Module } = await import('./module1/module1.module'));
    const { componentFactories } = this.compiler.compileModuleAndAllComponentsSync(Module1Module);

    for(const factory of componentFactories) {
      this.anchor.createComponent(factory);
    }
  }
}
```

![image](https://i.imgur.com/TwURoWC.png)

## 上述兩種方法 Demo

<iframe width="100%" height="450px" src="https://stackblitz.com/edit/lazy-ng-module?embed=1&file=src/app/app.component.ts"></iframe>

> 可以把註解切換一下

## Angular Ivy 出來之前的寫法 (已經不建議使用)

```typescript
import { AfterViewInit, Compiler, Component, Injector, NgModuleFactoryLoader, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<ng-container #anchor></ng-container>`,
  providers: [
    // SystemJsNgModuleLoader 已棄用
    // { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader }
  ]
})
export class AppComponent implements AfterViewInit {
  constructor(private injector: Injector, private loader: NgModuleFactoryLoader) {}

  @ViewChild('anchor', { read: ViewContainerRef }) anchor: ViewContainerRef;

  ngAfterViewInit() {
    const moduleFactory = this.loader.load('lazy/lazy.module#LazyModule');
    const { componentFactoryResolver } = moduleFactory.create(this.injector);
    const componentFactory = componentFactoryResolver.resolveComponentFactory(AComponent);  
    this.anchor.createComponent(componentFactory);
  }
}
```

> SystemJsNgModuleLoader 已棄用，不建議使用 loadChildren 的 string 形式，SystemJsNgModuleLoader 是其實現的一部分。

## 參考資料

- <https://indepth.dev/posts/1167/lazy-loading-angular-modules-with-ivy>
- <https://angular.io/guide/ivy-compatibility>
- <https://angular.tw/api/core/NgModuleFactoryLoader>
