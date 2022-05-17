import { InjectionToken } from '@angular/core';

import type { Dialog } from '@shared/services/dialog/dialog.interface';

export type DialogTypes = 'info' | 'settings' | 'default';

export interface DialogConfiguration {
  dialogs: Readonly<Record<DialogTypes, Dialog>>;
  dialogDetails(type: DialogTypes): Dialog;
}

export const dialogConfiguration: DialogConfiguration = {
  dialogs: {
    info: {
      hasBackdrop: true,
      backdropClass: 'dialog-info-backdrop',
      panelClass: 'dialog-info-panel',
    },
    settings: {
      hasBackdrop: true,
      backdropClass: 'dialog-settings-backdrop',
      panelClass: 'dialog-settings-panel',
    },
    default: {
      hasBackdrop: false,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel',
    },
  },
  dialogDetails(type: DialogTypes): Dialog {
    const dialogValues = Object.entries(this.dialogs).find(
      ([key]) => key === `${type}`
    )?.[1];

    return dialogValues ?? this.dialogs['default'];
  },
};

export const DIALOG_CONFIGURATION = new InjectionToken<DialogConfiguration>(
  'DIALOG_CONFIGURATION',
  {
    providedIn: 'root',
    factory: () => dialogConfiguration,
  }
);
