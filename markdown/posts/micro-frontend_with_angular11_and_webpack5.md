---
title: 實作 Micro frontend with angular 11 and webpack 5 的 POC 過程
tags: 
  - angular
  - webpack
  - micro-frontend
description: 實作過程的紀錄 & 備忘錄
author: 謝尚庭 Neil
date: 2020/12/15
published: true
---

## Current Environment

![image](https://i.imgur.com/OiSb9fH.png)

## Initial

```shell
ng new --create-application=false --packageManager=yarn mfdemo1 && cd mfdemo1

ng g application mfdemo1 --routing --style=scss
ng add @angular-architects/module-federation --project=mfdemo1 --port=4200

ng g application mf-app1 --routing=false --style=scss
ng add @angular-architects/module-federation --project=mf-app1 --port=4201
```

- Active webpack 5

  - Modify ./package.json

  ```json
  "resolutions": {
      "webpack": "^5.0.0"
  },
  ```

  - Currently, you can only use `yarn install` because npm does not yet support resolutions properties.

## Generate p0001 module and p0001 component

```shell
ng g m p0001 --routing --project=mf-app1
ng g c p0001 --skip-selector --project=mf-app1
```

- Modify ./projects/mf-app1/src/app/p0001/p0001-routing.module.ts

```typescript
import { P0001Component } from './p0001.component';

const routes: Routes = [
  {
    path: '',
    component: P0001Component
  }
];
```

## Set the moduleFederationPlugin for mf-app1

- Modify ./projects/mf-app1/webpack.config.js

```javascript
  plugins: [
    new ModuleFederationPlugin({
      
        // Do not allow dashlize naming convention
        name: "mfapp1",
        filename: "p0001.js",
        exposes: {
            './p0001.module': './projects/mf-app1/src/app/p0001/p0001.module.ts'
        },

    }),
    sharedMappings.getPlugin(),
  ],
```

## Set the moduleFederationPlugin for mfdemo1

- Modify ./projects/mfdemo1/webpack.config.js

```javascript
  plugins: [
    new ModuleFederationPlugin({
    
        remotes: {
            "mfapp1-remote": "mfapp1@http://localhost:4201/p0001.js",
        },
        
    }),
    sharedMappings.getPlugin(),
  ],
```

## Set the route configuration for mfdemo1

- Create ./projects/mfdemo1/projects/mfdemo1/src/mfapp1-remote.d.ts

```typescript
declare module 'mfapp1-remote/p0001.module';
```

> Avoiding typescript warnings

- Modify ./projects/mfdemo1/src/app/app-routing.module.ts

```typescript
const routes: Routes = [
  {
    path: 'p0001',
    // Lazy loaded local module
    loadChildren: () => import('mfapp1-remote/p0001.module').then(m => m.P0001Module)
  }
];
```

- Modify ./projects/mfdemo1/src/app/app.component.html

```html
<h1>{{ title }}</h1>
<router-outlet></router-outlet>
```

## Run Script

```shell
npx ng serve mfdemo1
npx ng serve mf-app1
```

## Run Result
![](https://i.imgur.com/IfbO9Ve.png)


## Issue

- Angular 11 doesn´t work serving application

    https://github.com/angular/angular-cli/issues/19264

    ![](https://i.imgur.com/MhGMig5.png)

## References

- https://www.npmjs.com/package/@angular-architects/module-federation
