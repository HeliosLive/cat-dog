import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { debounceTime, fromEvent, map, shareReplay } from 'rxjs';

import type { Animal } from '@shared/models/animal.type';

@Component({
  selector: 'hls-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  // private readonly bodyStyle = getComputedStyle(document.body);
  // private readonly wideHeight = this.bodyStyle.getPropertyValue('--hls-header-height-wide');
  // private readonly narrowHeight = this.bodyStyle.getPropertyValue('--hls-header-height-narrow');
  // private readonly innerHeight = window.innerHeight;

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
      let iosDebouncer = true;
      this.trackElementForScroll.addEventListener('scroll', (event: any) => {
        if (iosDebouncer) {
          alert(event?.path[0]);
          alert(event?.path[0].scrollTop);
          iosDebouncer = false;
          // const isComposed = !!(event.composedPath?.length > 0);
          // const src = isComposed ? event?.composedPath[0] : event?.path[0];
          // const scrollTop = src.scrollTop;
          // alert({ ...src });
          // alert(scrollTop);

          // const scrollAllowed = Math.floor(scrollTop) / this.innerHeight > 0.4;

          // document.documentElement.style.setProperty(
          //   '--hls-header-height',
          //   scrollAllowed ? this.narrowHeight : this.wideHeight
          // );

          //   setTimeout(() => {
          //     iosDebouncer = false;
          //   }, 2000);
        }
      });

      fromEvent(this.trackElementForScroll, 'scroll')
        .pipe(
          debounceTime(350),
          map((event: any) => {
            const isComposed = !!(event.composedPath?.length > 0);
            const src = isComposed ? event?.composedPath[0] : event?.path[0];

            // alert(
            //   ` scrollTop: ${src.scrollTop},
            //     eventExist: ${!!event},
            //     path: ${event?.path[0]},`
            // );
            return src.scrollTop;
          }),
          shareReplay()
        )
        .subscribe((_scrollTop: any) => {
          // const scrollAllowed = Math.floor(scrollTop) / this.innerHeight > 0.4;
          // document.documentElement.style.setProperty(
          //   '--hls-header-height',
          //   scrollAllowed ? this.narrowHeight : this.wideHeight
          // );
        });
    }
  }
}
