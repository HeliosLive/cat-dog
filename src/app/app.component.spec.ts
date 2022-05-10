import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { AppComponent } from './app.component';

import * as windowUtils from '@shared/utils/window';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should call listenViewportHeight when app started', () => {
    jest.spyOn(windowUtils, 'listenViewportHeight');

    spectator.component.ngOnInit();

    expect(windowUtils.listenViewportHeight).toHaveBeenCalled();
  });
});
