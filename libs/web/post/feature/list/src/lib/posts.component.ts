import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'asb-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
