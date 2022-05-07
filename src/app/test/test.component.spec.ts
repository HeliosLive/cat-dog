import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { TestComponent } from './test.component';

describe('TestComponent', () => {
  let spectator: Spectator<TestComponent>;

  const createComponent = createComponentFactory({
    component: TestComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should p tag exist', () => {
    const p = spectator.query('p');

    expect(p).toExist();
  });
});
