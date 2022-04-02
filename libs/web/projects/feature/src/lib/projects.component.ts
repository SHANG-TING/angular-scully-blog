import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'asb-projects',
  templateUrl: './projects.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  recentProjects = [
    {
      name: 'Partytown',
      description: '已排除部分範例上的錯誤，目前著重於排除在 Angular 環境下的問題。',
      image: 'https://partytown.builder.io/partytown-media.png',
      url: 'https://github.com/BuilderIO/partytown',
    },
    {
      name: 'ngxf-uploader',
      description: '新增複製貼上圖片、上傳資料夾（包含完整的單元測試）等功能。',
      image:
        'https://camo.githubusercontent.com/bf2bb97ffd6a9c21605572f40eea7b204ca7955676e7fe91ebf9dd50b69a7ec0/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f647737656364786c702f696d6167652f75706c6f61642f76313533323630393537302f6e67786675706c6f616465725f77376c7871762e676966',
      url: 'https://www.npmjs.com/package/ngxf-uploader',
    },
  ];

  maintainedProjects = [
    {
      name: '創科智盈',
      description: '創科智盈的官網。',
      image: 'https://i.imgur.com/2V3SfwV.png',
      url: 'https://inctw.com.tw',
    },
    {
      name: 'AKI Gallery',
      description: 'AKI Gallery 的官網。',
      image: 'https://i.imgur.com/mPjQIX6.png',
      url: 'https://www.galleryaki.com',
    },
  ];

  outdatedProjects = [
    {
      name: 'ngx-hm-dnd (deprecated)',
      description: '實作一個拖拉排序到某個類別下的功能。',
      image: 'https://i.imgur.com/U39508Y.gif',
      url: 'https://www.npmjs.com/package/ngx-hm-dnd',
    },
    {
      name: 'ngx-hm-calendar (deprecated)',
      description: '實作一個行事曆元件',
      image:
        'https://camo.githubusercontent.com/67786bbad7ec691e5e186b4d084673c873c996eca3eec89f2b7856922a5fb459/68747470733a2f2f692e696d6775722e636f6d2f635253494c4b752e6a7067',
      url: 'https://github.com/SHANG-TING/ngx-calendar',
    },
  ];
}
