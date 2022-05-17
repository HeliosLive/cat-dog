import { ViewContainerRef } from '@angular/core';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { DialogService } from './dialog.service';
import { DialogInfoComponent } from '@shared/containers/dialog-info/dialog-info.component';
import { dialogConfiguration } from '@config/dialog.config';

describe('DialogService', () => {
  let spectator: SpectatorService<DialogService>;
  let overlay: Overlay;

  const createService = createServiceFactory({
    service: DialogService,
    mocks: [OverlayRef],
    providers: [Overlay, ViewContainerRef],
  });

  beforeEach(() => {
    spectator = createService();

    overlay = spectator.inject(Overlay);
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('open', () => {
    it('should call create method after OnInit & attach the ElementRef overlayRef after click', () => {
      jest.spyOn(overlay, 'create');

      spectator.service.open(
        DialogInfoComponent,
        dialogConfiguration.dialogs.info
      );

      expect(overlay.create).toHaveBeenCalled();
    });
  });
});
