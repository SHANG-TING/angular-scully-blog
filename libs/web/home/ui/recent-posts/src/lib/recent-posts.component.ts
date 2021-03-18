import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import {
  select,
  Store,
} from '@ngrx/store';
import { getRecentPosts } from '@web/home/data-access/recent-posts';

@Component({
  selector: 'asb-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentPostsComponent {
  recentPosts$ = this.store.pipe(
    select(getRecentPosts)
  );

  constructor(private store: Store) {}
}
