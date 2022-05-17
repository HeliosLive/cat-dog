import { Overlay } from '@angular/cdk/overlay';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';

import { AppComponent } from './app.component';

import * as windowUtils from '@shared/utils/window';
import {
  dialogConfiguration,
  DIALOG_CONFIGURATION,
} from '@config/dialog.config';
import { HeaderComponent } from '@shared/containers/header/header.component';
import { DialogService } from '@shared/services/dialog/dialog.service';
import { DialogInfoComponent } from '@shared/containers/dialog-info/dialog-info.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let dialogService: DialogService;

  const createComponent = createComponentFactory({
    component: AppComponent,
    mocks: [DialogInfoComponent],
    declarations: [MockComponent(HeaderComponent)],
    providers: [
      Overlay,
      DialogService,
      { provide: DIALOG_CONFIGURATION, useValue: dialogConfiguration },
    ],
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();

    dialogService = spectator.inject(DialogService);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call listenViewportHeight', () => {
      jest.spyOn(windowUtils, 'listenViewportHeight');

      spectator.component.ngOnInit();

      expect(windowUtils.listenViewportHeight).toHaveBeenCalled();
    });

    it('should call listenViewportWidth', () => {
      jest.spyOn(windowUtils, 'listenViewportWidth');

      spectator.component.ngOnInit();

      expect(windowUtils.listenViewportWidth).toHaveBeenCalled();
    });
  });

  describe('onQuestioned', () => {
    it('should call the method after triggering the questioned output in headerComponent', () => {
      jest.spyOn(spectator.component, 'onQuestioned');
      jest.spyOn(dialogService, 'open');

      const headerComponent = spectator.query('hls-header', {
        read: HeaderComponent,
      });

      headerComponent?.questioned.emit('cat');

      expect(spectator.component.onQuestioned).toHaveBeenCalled();
      expect(spectator.component.onQuestioned).toHaveBeenCalledWith('cat');
      expect(dialogService.open).toHaveBeenCalled();
      expect(dialogService.open).toHaveBeenCalledWith(DialogInfoComponent, {
        data: 'cat',
        ...dialogConfiguration.dialogs.info,
      });
    });
  });
});
