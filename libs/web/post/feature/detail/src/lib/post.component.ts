import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { PostStore } from '@web/post/data-access';

import { HighlightService } from './highlight.service';

@Component({
  selector: 'asb-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [PostStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements AfterViewChecked {
  post$ = this.store.post$;

  constructor(
    private highlightService: HighlightService,
    private store: PostStore
  ) {}

  ngAfterViewChecked(): void {
    this.highlightService.highlightAll();
  }
}
