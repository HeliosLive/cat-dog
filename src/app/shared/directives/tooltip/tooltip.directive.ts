import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import {
  ConnectionPositionPair,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[hlsTooltipTemplate]',
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input() hlsTooltipTemplate!: TemplateRef<object>;
  @Input() fixedTo?: HTMLElement;

  private destroy$ = new Subject<void>();
  private overlayRef!: OverlayRef;
  clickBuffer = 800;

  constructor(
    private elementRef: ElementRef,
    private overlay: Overlay,
    private vcr: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.listenElementClick();
    this.createOverlay();
  }

  ngOnDestroy(): void {
    this.detachOverlay();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private listenElementClick() {
    fromEvent(this.fixedTo ?? this.elementRef.nativeElement, 'click')
      .pipe(
        tap(() => {
          this.attachOverlay();
        }),
        debounceTime(this.clickBuffer),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private createOverlay(): void {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        new ConnectionPositionPair(
          { originX: 'end', originY: 'bottom' },
          { overlayX: 'start', overlayY: 'top' },
          -8,
          0
        ),
      ])
      .withPush(false);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true,
    });

    /* istanbul ignore next */
    this.overlayRef
      .backdropClick()
      .pipe(
        tap(() => this.detachOverlay()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private attachOverlay(): void {
    if (!this.overlayRef.hasAttached()) {
      const periodSelectorPortal = new TemplatePortal(
        this.hlsTooltipTemplate,
        this.vcr
      );
      this.overlayRef.attach(periodSelectorPortal);
    }
  }

  private detachOverlay(): void {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
