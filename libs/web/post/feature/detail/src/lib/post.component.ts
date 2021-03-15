import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ScullyRoutesService } from '@scullyio/ng-lib';

import { HighlightService } from './highlight.service';

@Component({
  selector: 'asb-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit, AfterViewChecked {
  currentPost$ = this.scullyRouteService.getCurrent();

  constructor(
    private route: ActivatedRoute,
    private highlightService: HighlightService,
    private scullyRouteService: ScullyRoutesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(console.log);
    this.scullyRouteService.getCurrent().subscribe(console.log);
  }

  ngAfterViewChecked(): void {
    this.highlightService.highlightAll();
  }
}
