import {
  fromEvent,
  startWith,
  debounceTime,
  pluck,
  distinctUntilChanged,
} from 'rxjs';

export function listenViewportHeight(): void {
  fromEvent(window, 'resize')
    .pipe(
      startWith({ target: { innerHeight: window.innerHeight } }),
      debounceTime(40),
      pluck('target', 'innerHeight'),
      distinctUntilChanged()
    )
    .subscribe((height) => {
      document.documentElement.style.setProperty(
        '--vh',
        `${Number(height) * 0.01}px`
      );
    });
}

export function listenViewportWidth(): void {
  fromEvent(window, 'resize')
    .pipe(
      startWith({ target: { innerWidth: window.innerWidth } }),
      debounceTime(40),
      pluck('target', 'innerWidth'),
      distinctUntilChanged()
    )
    .subscribe((width) => {
      document.documentElement.style.setProperty(
        '--vw',
        `${Number(width) * 0.01}px`
      );
    });
}
