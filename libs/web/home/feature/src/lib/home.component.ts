import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';

import { Store } from '@ngrx/store';
import { loadRecentPosts } from '@web/home/data-access/recent-posts';

@Component({
  selector: 'asb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadRecentPosts());
  }
}
