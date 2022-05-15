import { ViewContainerRef } from '@angular/core';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import {
  createDirectiveFactory,
  SpectatorDirective,
} from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';
import { SvgIconComponent } from 'angular-svg-icon';

import { TooltipDirective } from './tooltip.directive';

describe('Directive: TooltipDirective', () => {
  let spectator: SpectatorDirective<TooltipDirective>;
  let overlay: Overlay;

  const createDirective = createDirectiveFactory({
    directive: TooltipDirective,
    declarations: [MockComponent(SvgIconComponent)],
    mocks: [OverlayRef],
    providers: [Overlay, ViewContainerRef],
    template: `
    <button #button class="tooltip-close">close tooltip</button>
    <svg-icon name="dots" [hlsTooltipTemplate]="actionTooltip" [fixedTo]="button">open tooltip</svg-icon>
    <img src="./assets/image/test" [hlsTooltipTemplate]="actionTooltip">open tooltip>
    <ng-template #actionTooltip>
        <p>Bravo! you opened it.</p>
    </ng-template>
    `,
  });

  beforeEach(() => {
    spectator = createDirective();

    overlay = spectator.inject(Overlay);
  });

  it('should create an instance', () => {
    const instance = spectator.directive;

    expect(instance).toBeDefined();
  });

  it('should destroy', () => {
    spectator.directive.ngOnDestroy();

    expect(spectator.directive).toBeDefined();
  });

  describe('overlay', () => {
    it('should call create method after OnInit & attach the ElementRef overlayRef after click', () => {
      jest.spyOn(overlay, 'create');

      spectator.directive.ngOnInit();

      const icon = spectator.query('svg-icon');

      if (icon) {
        spectator.click(icon);
      }

      expect(overlay.create).toHaveBeenCalled();
    });

    it('should call create method after OnInit & attach the fixedTo overlayRef after click', () => {
      jest.spyOn(overlay, 'create');

      spectator.directive.ngOnInit();

      const img = spectator.query('img');

      if (img) {
        spectator.click(img);
      }

      expect(overlay.create).toHaveBeenCalled();
    });

    it('should call detach method after clicking the ElementRef overlayRef', () => {
      jest.spyOn(overlay, 'create');

      spectator.directive.ngOnInit();

      const icon = spectator.query('svg-icon');

      if (icon) {
        spectator.click(icon);
      }

      expect(overlay.create).toHaveBeenCalled();

      spectator.directive.ngOnDestroy();
    });
  });
});
