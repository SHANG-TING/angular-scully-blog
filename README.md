# Neil's Notepad

這是使用 Angular 13、Nx Workspace、ngrx、TailwindCSS 和 Scully (SSG) 所建立的部落格網站。

## 運行中的部落格網站

查看部落格網站 -> <https://blog.neilxie.net>

## 使用技術

- [Angular 13][angular]
- [Nx Workspace][nx]
- [ngneat][] 主要使用 `ngneat/svg-icon` 和 `ngneat/until-destroy`
- [ngrx][ngrx] and [ngrx/component-store][component-store]
- [Angular Material][angular-material] UI component: select.
- [TailwindCSS][tailwind]
- [Scully][scully] 基於 Angular 的 Server Side Generator
- [utterances][utterances] 基於 GitHub issues 的 component

[angular]: https://angular.io/
[nx]: https://nx.dev/
[ngrx]: https://ngrx.io/
[component-store]: https://ngrx.io/guide/component-store
[angular-material]: https://material.angular.io/
[tailwind]: https://tailwindcss.com/
[ngneat]: https://github.com/ngneat
[scully]: https://scully.io/
[utterances]: https://utteranc.es/

## 專案架構

```
.
└── root
    ├── apps
    │   └── angular-scully-blog
    └── libs
        └── web (dir)
            ├── shell (dir)
            │   ├── feature (angular:lib) - for configure any forRoot modules
            │   └── ui
            │       └── layout (angular:lib)
            ├── settings (dir)
            │   ├── data-access (workspace:lib)
            │   └── feature (angular:lib SettingsComponent)
            ├── post (dir)
            │   ├── data-access (angular:lib, service, state management)
            │   └── features
            │       ├── list (angular:lib PostsComponent)
            │       └── detail (angular:lib PostComponent)
            ├── tag (dir)
            │   ├── data-access (angular:lib, service, state management)
            │   └── features
            │       ├── list (angular:lib TagsComponent)
            │       └── detail (angular:lib TagComponent)
            ├── projects (dir)
            │   └── feature
            ├── about (dir)
            │   └── feature
            ├── home (dir)
            │   ├── data-access (angular:lib)
            │   ├── feature (angular:lib)
            │   └── ui (dir)
            │       └── recent-posts (angular:lib, SCAM for Component)
            └── shared (dir)
                ├── data-access (angular:lib, API call, Service or State management to share across the Client app)
                └── ui (dir)
```

## 使用的 Github Actions

- [Scully Publish](https://github.com/marketplace/actions/scully-publish) 負責打包和部署 Scully site 到 GitHub Pages
- [LINE Notify](https://github.com/marketplace/actions/line-notify) 發送部署完成的通知
