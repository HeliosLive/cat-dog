import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { debounceTime, fromEvent, map, shareReplay, tap } from 'rxjs';

import type { Animal } from '@shared/models/animal.type';

@Component({
  selector: 'hls-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly bodyStyle = getComputedStyle(document.body);
  private readonly wideHeight = this.bodyStyle.getPropertyValue('--hls-header-height-wide');
  private readonly narrowHeight = this.bodyStyle.getPropertyValue('--hls-header-height-narrow');

  @Input() trackElementForScroll?: Element;

  @Input()
  @HostBinding('attr.data-cy')
  testId?: string;

  @Output() questioned: EventEmitter<Animal> = new EventEmitter();

  ngOnInit() {
    this.listenElementScroll();
  }

  private listenElementScroll(): void {
    if (this.trackElementForScroll) {
      fromEvent(this.trackElementForScroll, 'scroll')
        .pipe(
          debounceTime(150),
          map((event: any) => {
            const { offsetHeight, scrollTop } = event.target;

            return { offsetHeight, scrollTop };
          }),
          tap((src: { offsetHeight: number; scrollTop: number }) => {
            const { offsetHeight, scrollTop } = src;
            const scrollAllowed = Math.floor(scrollTop) / offsetHeight > 0.4;
            document.documentElement.style.setProperty(
              '--hls-header-height',
              scrollAllowed ? this.narrowHeight : this.wideHeight
            );
          }),
          shareReplay()
        )
        .subscribe();
    }
  }
}
