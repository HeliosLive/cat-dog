import { NgModule } from '@angular/core';

import { dialogConfiguration, DIALOG_CONFIGURATION } from './dialog.config';

@NgModule({
  providers: [{ provide: DIALOG_CONFIGURATION, useValue: dialogConfiguration }],
})
export class ConfigModule {}
