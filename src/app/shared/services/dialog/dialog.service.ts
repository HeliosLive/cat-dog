import { Injectable, Injector } from '@angular/core';

import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { take } from 'rxjs';

import type { Dialog } from './dialog.interface';
import { DialogRef } from './dialog-ref';
import { DIALOG_DATA } from './dialog-tokens';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private injector: Injector, private overlay: Overlay) {}

  open<T>(component: ComponentType<T>, config: Dialog): DialogRef {
    const dialogConfig = config;
    const overlay = this.createOverlay(dialogConfig);
    const dialogRef = new DialogRef(overlay);
    const injector = this.createInjector(dialogConfig, dialogRef);
    const portal = new ComponentPortal(component, null, injector);

    overlay.attach(portal);

    this.trackBackdrop(overlay, dialogRef, config);

    return dialogRef;
  }

  private createOverlay(config: Dialog): OverlayRef {
    const overlayConfig = this.getOverlayConfig(config);

    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: Dialog): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    return new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      height: config.height,
      width: config.width,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });
  }

  private createInjector(config: Dialog, dialogRef: DialogRef): any {
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: config?.data },
      ],
    });
    return injector;
  }

  /* istanbul ignore next */
  private trackBackdrop(
    overlay: OverlayRef,
    dialogRef: DialogRef,
    config?: Dialog
  ) {
    overlay
      .backdropClick()
      .pipe(take(1))
      .subscribe(() => {
        if (!config?.disableClose) {
          dialogRef.close();
        }
        dialogRef.backdropClick.next();
      });
  }
}
