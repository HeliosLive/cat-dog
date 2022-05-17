import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  liked = false;

  onLike(): void {
    this.liked = !this.liked;
  }
}
