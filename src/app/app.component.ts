import { Component, OnInit, ViewChild } from '@angular/core';

import { listenViewportHeight } from '@shared/utils/window';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cat-dog';

  @ViewChild('body') body!: Element;

  ngOnInit(): void {
    listenViewportHeight();
  }
}
