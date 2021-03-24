import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { PostStore } from '@web/post/data-access';

import { HighlightService } from './highlight.service';

@Component({
  selector: 'asb-post',
  templateUrl: './post.component.html',
  providers: [PostStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
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
