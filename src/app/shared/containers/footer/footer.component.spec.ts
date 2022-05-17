import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { SvgIconComponent } from 'angular-svg-icon';
import { MockComponent } from 'ng-mocks';

import { FooterComponent } from './footer.component';

import type { Gender } from '@shared/models/gender.type';

describe('FooterComponent', () => {
  const testId = 'footer-test-id';

  let spectator: Spectator<FooterComponent>;
  const createComponent = createComponentFactory({
    component: FooterComponent,
    declarations: [MockComponent(SvgIconComponent)],
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

  describe('userIcon', () => {
    it('should user icon name equals to female', () => {
      const gender: Gender = 'female';
      spectator.component.gender = gender;
      spectator.detectComponentChanges();

      const userIcon = spectator.queryAll('svg-icon', {
        read: SvgIconComponent,
      })[1];

      expect(userIcon?.name).toEqual(gender);
    });

    it('should user icon name equals to male', () => {
      const gender: Gender = 'male';

      spectator.component.gender = gender;
      spectator.detectComponentChanges();

      const userIcon = spectator.queryAll('svg-icon', {
        read: SvgIconComponent,
      })[1];

      expect(userIcon?.name).toEqual(gender);
    });
  });

  it('should host data-cy attribute equals to testId input', () => {
    expect(spectator.element).toHaveAttribute('data-cy', testId);
  });

  it('should Host svg-icon element count equals to sections array length', () => {
    const svgIconLength = spectator.queryAll('svg-icon')?.length;
    const sectionsLength = spectator.component.sections.length;

    expect(svgIconLength).toEqual(sectionsLength);
  });

  it('should Host has all svg-icon elements that sections array includes', () => {
    for (let section of spectator.component.sections) {
      const sectionIcon = spectator.query(byTestId(`${section}-icon`));

      expect(sectionIcon).toExist();
    }
  });

  describe('onSelect', () => {
    it('should call the method with exact value after clicking the related svg-icon', () => {
      jest.spyOn(spectator.component, 'onSelect');

      for (let section of spectator.component.sections) {
        const sectionIcon = spectator.query(byTestId(`${section}-icon`));

        if (sectionIcon) {
          spectator.click(sectionIcon);
        }

        expect(spectator.component.onSelect).toHaveBeenCalled();
        expect(spectator.component.onSelect).toHaveBeenCalledWith(section);
      }
    });

    it('should selectedSection and selected output emits the passed value correctly', () => {
      jest.spyOn(spectator.component.selected, 'emit');

      spectator.component.onSelect('dog');

      expect(spectator.component.selectedSection).toBe('dog');
      expect(spectator.component.selected.emit).toHaveBeenCalled();
      expect(spectator.component.selected.emit).toHaveBeenCalledWith('dog');
    });
  });
});
