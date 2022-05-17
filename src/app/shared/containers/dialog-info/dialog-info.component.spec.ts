import { fakeAsync, tick } from '@angular/core/testing';

import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { SvgIconComponent } from 'angular-svg-icon';
import { MockComponent } from 'ng-mocks';

import { DialogInfoComponent } from './dialog-info.component';

import { TextComponent } from '@shared/components/text/text.component';
import { DialogRef } from '@shared/services/dialog/dialog-ref';
import { DIALOG_DATA } from '@shared/services/dialog/dialog-tokens';
import { EmojiIcons } from '@core/svg-register/emoji-icons.enum';

describe('DialogInfoComponent', () => {
  const data = 'testing-data';
  const testId = 'dialog-info-modal';
  const emojis = Object.keys(EmojiIcons).map((name) => {
    return name as EmojiIcons;
  });

  let spectator: Spectator<DialogInfoComponent>;

  const createComponent = createComponentFactory({
    component: DialogInfoComponent,
    declarations: [
      MockComponent(SvgIconComponent),
      MockComponent(TextComponent),
    ],
    mocks: [DialogRef],
    providers: [{ provide: DIALOG_DATA, useValue: data }],
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        testId,
      },
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should host data-cy attribute equals to testId input', () => {
    expect(spectator.element).toHaveAttribute('data-cy', testId);
  });

  it('should call onClose after clicking the close icon', () => {
    jest.spyOn(spectator.component, 'onClose');

    const closeIcon = spectator.query('.close-icon');

    if (closeIcon) {
      spectator.click(closeIcon);
    }

    expect(spectator.component.onClose).toHaveBeenCalled();
  });

  describe('emojis', () => {
    it('should emojis data inside component equals to emoji icons enum data', () => {
      expect(spectator.component.emojis).toEqual(emojis);
    });

    for (let emoji of emojis) {
      it(`should host has ${emoji} icon and after click calls the onReaction method with ${emoji}`, fakeAsync(() => {
        jest.spyOn(spectator.component, 'onReaction');
        jest.spyOn(spectator.component.reaction, 'emit');
        jest.spyOn(spectator.component, 'onClose');

        const icon = spectator.query(`.icons > [data-cy="${emoji}-icon"]`);

        expect(icon).toExist();

        if (icon) {
          spectator.click(icon);
        }

        expect(spectator.component.onReaction).toHaveBeenCalled();
        expect(spectator.component.onReaction).toHaveBeenCalledWith(emoji);
        expect(spectator.component.reaction.emit).toHaveBeenCalled();
        expect(spectator.component.reaction.emit).toHaveBeenCalledWith(emoji);

        tick(spectator.component.fadeOutTime);

        expect(spectator.component.onClose).toHaveBeenCalled();
      }));
    }
  });
});
