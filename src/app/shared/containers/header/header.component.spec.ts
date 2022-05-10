import { Component, ViewChild } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';

import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';

import { HeaderComponent } from './header.component';

import type { Animal } from '@shared/models/animal.type';

@Component({
  selector: 'hls-header-test',
  template: `<hls-header [trackElementForScroll]="body"></hls-header>
    <div #body></div>`,
})
export class ContentProjectionHeaderComponent {
  @ViewChild('body') body!: Element;
}

describe('HeaderComponent', () => {
  const testId = 'header-test-id';
  const trackElementForScroll = `<div></div>` as unknown as Element;

  let spectator: Spectator<HeaderComponent>;
  const createComponent = createComponentFactory({
    component: HeaderComponent,
    shallow: true,
  });
  let ContentProjectionSpectator: Spectator<ContentProjectionHeaderComponent>;
  const createContentProjectionComponent = createComponentFactory({
    component: ContentProjectionHeaderComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        trackElementForScroll,
        testId,
      },
    });
    ContentProjectionSpectator = createContentProjectionComponent({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should Host svg-icon element count equals to question-mark icons length', () => {
    const svgIconLength = spectator.queryAll('svg-icon')?.length;
    const questionMarkIconsLength =
      spectator.queryAll('.question-mark')?.length;

    expect(svgIconLength).toEqual(questionMarkIconsLength);
  });

  it('should Host has an img element', () => {
    const imgElement = spectator.query('img');

    expect(imgElement).toExist();
  });

  it('should host data-cy attribute equals to testId input', () => {
    expect(spectator.element).toHaveAttribute('data-cy', testId);
  });

  describe('questioned', () => {
    it('should call the method with exact value after clicking the related svg-icon', () => {
      jest.spyOn(spectator.component.questioned, 'emit');

      const animalIcons: Animal[] = ['cat', 'dog'];

      for (let animal of animalIcons) {
        const animalIcon = spectator.query(
          byTestId(`${animal}-question-mark-icon`)
        );

        if (animalIcon) {
          spectator.click(animalIcon);
        }

        expect(spectator.component.questioned.emit).toHaveBeenCalled();
        expect(spectator.component.questioned.emit).toHaveBeenCalledWith(
          animal
        );
      }
    });
  });

  describe('listenElementScroll', () => {
    beforeEach(() => {
      jest.spyOn(document.documentElement.style, 'setProperty');
    });

    it('should call setProperty with header height and wide height', fakeAsync(() => {
      const projectedElement = ContentProjectionSpectator.query('div');

      let event = new CustomEvent('scroll');
      event.composedPath = [
        {
          scrollTop: 0,
        },
      ] as any;

      if (projectedElement) {
        projectedElement.dispatchEvent(event);
      }

      tick(150);

      expect(document.documentElement.style.setProperty).toHaveBeenCalled();
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--hls-header-height',
        ''
      );
    }));

    it('should call setProperty with header height and narrow height', fakeAsync(() => {
      const projectedElement = ContentProjectionSpectator.query('div');

      let event = new CustomEvent('scroll');
      event.composedPath = [
        {
          scrollTop: 2000,
        },
      ] as any;

      if (projectedElement) {
        projectedElement.dispatchEvent(event);
      }

      tick(150);

      expect(document.documentElement.style.setProperty).toHaveBeenCalled();
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--hls-header-height',
        ''
      );
    }));

    it('should call setProperty if composedPath length is zero but path is not', fakeAsync(() => {
      const projectedElement = ContentProjectionSpectator.query('div');

      let event = new CustomEvent('scroll');
      (event as any).path = [
        {
          scrollTop: 2000,
        },
      ];

      if (projectedElement) {
        projectedElement.dispatchEvent(event);
      }

      tick(150);

      expect(document.documentElement.style.setProperty).toHaveBeenCalled();
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--hls-header-height',
        ''
      );
    }));
  });
});
