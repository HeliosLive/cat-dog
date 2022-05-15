import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { SvgIconComponent } from 'angular-svg-icon';
import { MockComponent } from 'ng-mocks';

import type { Action } from './action.component';
import { ActionComponent } from './action.component';

import { TextComponent } from '@shared/components/text/text.component';

describe('ActionComponent', () => {
  const testId = 'action-dialog-test-id';

  let spectator: Spectator<ActionComponent>;
  const createComponent = createComponentFactory({
    component: ActionComponent,
    declarations: [MockComponent(SvgIconComponent)],
    mocks: [TextComponent],
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        isSaved: false,
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

  it('should Host li elements count equals to actions array length', () => {
    const svgIconLength = spectator.queryAll('li')?.length;
    const sectionsLength = spectator.component.actions.length;

    expect(svgIconLength).toEqual(sectionsLength);
  });

  it('should action icon names present correctly', () => {
    const actionIcons = spectator.queryAll('svg-icon', {
      read: SvgIconComponent,
    });

    for (let k = 0; k < actionIcons.length; k++) {
      const actionIcon = actionIcons[k];

      expect(actionIcon.klass).toEqual(spectator.component.actions[k]);
      expect(actionIcon.name).toEqual(spectator.component.actions[k]);
    }
  });

  describe('isActive', () => {
    const actions: { name: Action; isSaved: boolean; result: boolean }[] = [
      {
        name: 'save',
        isSaved: true,
        result: true,
      },
      {
        name: 'save',
        isSaved: false,
        result: false,
      },
      {
        name: 'hide',
        isSaved: true,
        result: false,
      },
      {
        name: 'hide',
        isSaved: false,
        result: false,
      },
    ];

    for (let action of actions) {
      it(`should return ${action.result} when action is ${action.name} and saved is ${action.isSaved}`, () => {
        spectator.component.isSaved = action.isSaved;

        const isActive = spectator.component.isActive(action.name);

        expect(isActive).toEqual(action.result);
      });
    }
  });
});
