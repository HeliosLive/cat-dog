import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { debounceTime, fromEvent, map, shareReplay, Subject, takeUntil, tap } from 'rxjs';

import type { Animal } from '@shared/models/animal.type';

@Component({
  selector: 'hls-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly bodyStyle = getComputedStyle(document.body);
  private readonly wideHeight = this.bodyStyle.getPropertyValue('--hls-header-height-wide');
  private readonly narrowHeight = this.bodyStyle.getPropertyValue('--hls-header-height-narrow');
  private destroy$ = new Subject<void>();

  @Input() trackElementForScroll?: Element;

  @Input()
  @HostBinding('attr.data-cy')
  testId?: string;

  @Output() questioned: EventEmitter<Animal> = new EventEmitter();

  ngOnInit() {
    this.listenElementScroll();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
          takeUntil(this.destroy$),
          shareReplay()
        )
        .subscribe();
    }
  }
}
