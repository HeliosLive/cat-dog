import { Component } from '@angular/core';

import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import type { TextType } from './text.component';
import { TextComponent } from './text.component';

@Component({
  selector: 'app-content-projection-test',
  template: `<hls-text>{{ projectedContent }}</hls-text>`,
})
export class ContentProjectionTestComponent {
  public projectedContent = 'Some Text';
}

describe('TextComponent', () => {
  const getClassName = (
    name: 'disabled' | 'ellipsis' | 'underline' | 'pointer'
  ) => {
    return `${'hls-text-' + name}`;
  };
  const type: TextType = 'title';
  const testId = 'text-test-id';

  let spectator: Spectator<TextComponent>;
  const createComponent = createComponentFactory({
    component: TextComponent,
    shallow: true,
  });
  let ContentProjectionSpectator: Spectator<ContentProjectionTestComponent>;
  const createContentProjectionComponent = createComponentFactory({
    component: ContentProjectionTestComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        type,
        testId,
      },
    });
    ContentProjectionSpectator = createContentProjectionComponent({});
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should Host data-type attr equals to type input', () => {
    expect(spectator.element).toHaveAttribute('data-type', type);
  });

  it('should Host class not contains disabled class if disabled is not true', () => {
    const expectedClass = spectator.element?.className.includes(
      getClassName('disabled')
    );

    expect(expectedClass).toBe(false);
  });

  it('should Host class contains disabled class if disabled is true', () => {
    spectator.component.disabled = true;
    spectator.detectChanges();

    const expectedClass = spectator.element?.className.includes(
      getClassName('disabled')
    );

    expect(expectedClass).toBe(true);
  });

  it('should Host class not contains ellipsis class if ellipsis is not true', () => {
    const expectedClass = spectator.element?.className.includes(
      getClassName('ellipsis')
    );

    expect(expectedClass).toBe(false);
  });

  it('should Host class contains ellipsis class if ellipsis is true', () => {
    spectator.component.ellipsis = true;
    spectator.detectChanges();

    const expectedClass = spectator.element?.className.includes(
      getClassName('ellipsis')
    );

    expect(expectedClass).toBe(true);
  });

  it('should Host class not contains underline class if underline is not true', () => {
    const expectedClass = spectator.element?.className.includes(
      getClassName('underline')
    );

    expect(expectedClass).toBe(false);
  });

  it('should Host class contains underline class if underline is true', () => {
    spectator.component.underline = true;
    spectator.detectChanges();

    const expectedClass = spectator.element?.className.includes(
      getClassName('underline')
    );

    expect(expectedClass).toBe(true);
  });

  it('should Host class not contains pointer class if pointer is not true', () => {
    const expectedClass = spectator.element?.className.includes(
      getClassName('pointer')
    );

    expect(expectedClass).toBe(false);
  });

  it('should Host class contains pointer class if pointer is true', () => {
    spectator.component.pointer = true;
    spectator.detectChanges();

    const expectedClass = spectator.element?.className.includes(
      getClassName('pointer')
    );

    expect(expectedClass).toBe(true);
  });

  it('should host data-cy attribute equals to testId input', () => {
    expect(spectator.element).toHaveAttribute('data-cy', testId);
  });

  it('should display the projected content correctly', () => {
    const projectedElement: HTMLDivElement | null =
      ContentProjectionSpectator.query('hls-text');
    expect(projectedElement?.textContent).toEqual(
      ContentProjectionSpectator.component.projectedContent
    );

    const newElement = '<p>new projected content</p>';
    ContentProjectionSpectator.component.projectedContent = newElement;
    ContentProjectionSpectator.detectChanges();
    expect(ContentProjectionSpectator.element.textContent).toEqual(newElement);
    expect(ContentProjectionSpectator.element.textContent).not.toEqual(
      newElement.repeat(2)
    );
  });
});
