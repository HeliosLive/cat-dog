import { configure } from '@testing-library/dom';

import 'jest-preset-angular/setup-jest';
import './jestGlobalMocks';
import 'jest-location-mock';

configure({
  testIdAttribute: 'data-cy',
});
