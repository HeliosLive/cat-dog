import {
  createComponentFactory,
  createHostFactory,
  Spectator,
  SpectatorHost,
} from '@ngneat/spectator/jest';

import type { ButtonColor } from './button.component';
import { ButtonComponent } from './button.component';
import type { TextType } from '../text/text.component';
import { TextComponent } from '../text/text.component';

describe('Button', () => {
  describe('ButtonComponentHost', () => {
    let spectatorHost: SpectatorHost<ButtonComponent>;
    const createHost = createHostFactory({
      component: ButtonComponent,
      mocks: [TextComponent],
      shallow: true,
    });

    describe('content projection', () => {
      it('should text component type equals to textType input', () => {
        const textType: TextType = 'caption';
        spectatorHost = createHost(
          `<button hls-button textType=${textType}></button>`
        );

        expect(spectatorHost.component.textType).toEqual(textType);
      });

      it('should Host text content equals to content projection value', () => {
        const text = 'this is a crazy host test';
        spectatorHost = createHost(`<button hls-button>${text}</button>`);

        expect(spectatorHost.element.textContent).toEqual(text);
        expect(spectatorHost.element.textContent).not.toEqual(
          `incorrect${text}incorrect`
        );
      });
    });

    describe('selector', () => {
      it('should Host has the attr for passed selector', () => {
        spectatorHost = createHost(`<button hls-raised-button></button>`);

        expect(spectatorHost.element).toHaveAttribute('hls-raised-button');
      });

      it('should Host has the specific class for passed selector', () => {
        spectatorHost = createHost(`<button hls-raised-button></button>`);

        const elementClass =
          spectatorHost.element?.className.includes('hls-raised-button');

        expect(elementClass).toBe(true);
      });
    });

    describe('disabled', () => {
      it('should Host disabled attr does not exist if disabled input is not passed', () => {
        spectatorHost = createHost(`<button hls-button></button>`);

        expect(spectatorHost.element).not.toHaveAttribute('disabled');
      });

      it('should Host disabled attr does not exist if disabled input is false', () => {
        spectatorHost = createHost(
          `<button hls-button [disabled]="false"></button>`
        );

        expect(spectatorHost.element).not.toHaveAttribute('disabled');
      });

      it('should Host disabled attr exist if disabled input is true', () => {
        spectatorHost = createHost(
          `<button hls-button [disabled]="true"></button>`
        );

        expect(spectatorHost.element).toHaveAttribute('disabled', 'disabled');
      });

      it('should Host hls-button-disabled class exist if disabled input is true', () => {
        spectatorHost = createHost(
          `<button hls-button [disabled]="true"></button>`
        );

        const disabledClass = spectatorHost.element?.className.includes(
          'hls-button-disabled'
        );

        expect(disabledClass).toBe(true);
      });

      it('should Host hls-button-disabled class does not exist if disabled input is false', () => {
        spectatorHost = createHost(
          `<button hls-button [disabled]="false"></button>`
        );

        const disabledClass = spectatorHost.element?.className.includes(
          'hls-button-disabled'
        );

        expect(disabledClass).toBe(false);
      });
    });
  });

  describe('ButtonComponent', () => {
    const textType: TextType = 'subheading';
    const color: ButtonColor = 'primary';
    const testId = 'test-button-id';

    let spectator: Spectator<ButtonComponent>;
    const createComponent = createComponentFactory({
      component: ButtonComponent,
      mocks: [TextComponent],
      shallow: true,
    });

    beforeEach(() => {
      spectator = createComponent({
        props: {
          textType,
          color,
          testId,
        },
      });
    });

    it('should create', () => {
      spectator.component.ngOnInit();
      expect(spectator.component).toBeTruthy();
    });

    it('should Host color attr equals to color input', () => {
      expect(spectator.element).toHaveAttribute('color', color);
    });

    it('should Host data-cy attr equals to testId input', () => {
      expect(spectator.element).toHaveAttribute('data-cy', testId);
    });
  });
});
