import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { SvgIconComponent } from 'angular-svg-icon';
import { MockComponent } from 'ng-mocks';
import 'hammerjs';

import { ArticleComponent } from './article.component';

import { HlsTimeAgoPipeModule } from '@shared/pipes/time-ago.pipe.module';

describe('ArticleComponent', () => {
  const testId = 'footer-test-id';

  let spectator: Spectator<ArticleComponent>;
  const createComponent = createComponentFactory({
    component: ArticleComponent,
    declarations: [MockComponent(SvgIconComponent)],
    imports: [HlsTimeAgoPipeModule],
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

  // TO DO: continue testing after state management implemented
  // e.g. likes and clicks
});
