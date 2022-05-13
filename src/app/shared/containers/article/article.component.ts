import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';

import { debounceTime, fromEvent, pluck, Subject, takeUntil, tap } from 'rxjs';

import type { Article } from '@shared/models/article.interface';

@Component({
  selector: 'hls-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  // TO DO: after ngrx implementation try the delay after double click emit and like value return
  // then we can switch it to onpush again..
})
export class ArticleComponent implements OnInit, OnDestroy {
  @Input() article: Article = {
    user: {
      picture: 'https://i.pravatar.cc/40',
      name: 'Ahmet Aydin',
    },
    image: 'https://cdn2.thecatapi.com/images/yFwzO96ds.jpg',
    description:
      'Until you make peace with who you are, you will never be content with what you have.',
    date: new Date(2022, 3, 24),
  };
  @Input() liked = false;
  @Input()
  @HostBinding('attr.data-cy')
  testId?: string;

  animatedLiked = false;
  showMore = false;
  private likeBuffer = 800;
  private destroy$ = new Subject();

  ngOnInit() {
    this.trackDoubleTap();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  private trackDoubleTap() {
    const hammerConfig = new HammerGestureConfig();
    const hammer = hammerConfig.buildHammer(document.documentElement);

    /* istanbul ignore next */
    fromEvent(hammer, 'doubletap')
      .pipe(
        pluck('target', 'tagName'),
        tap((tag: unknown) => {
          if (tag === 'IMG') {
            this.animationLike();
          }
        }),
        debounceTime(this.likeBuffer),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onLike() {
    this.liked = !this.liked;
  }

  animationLike() {
    this.liked = true;

    this.animatedLiked = true;
    setTimeout(() => {
      this.animatedLiked = false;
    }, this.likeBuffer);
  }

  onShowMore(): void {
    this.showMore = !this.showMore;
  }
}
