import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class DialogRef {
  private afterClosedSubject = new Subject<any>();

  constructor(private overlayRef: OverlayRef) {}

  public backdropClick = new Subject<void>();

  public close(result?: any) {
    this.overlayRef.dispose();
    this.afterClosedSubject.next(result);
    this.afterClosedSubject.complete();
  }
}
