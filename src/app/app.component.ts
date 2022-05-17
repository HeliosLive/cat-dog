import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import {
  DialogConfiguration,
  DIALOG_CONFIGURATION,
} from '@config/dialog.config';
import type { Animal } from '@shared/models/animal.type';
import {
  listenViewportHeight,
  listenViewportWidth,
} from '@shared/utils/window';
import { DialogInfoComponent } from '@shared/containers/dialog-info/dialog-info.component';
import { DialogService } from '@shared/services/dialog/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cat-dog';

  @ViewChild('body') body!: Element;

  constructor(
    private dialogService: DialogService,
    @Inject(DIALOG_CONFIGURATION)
    private dialogConfiguration: DialogConfiguration
  ) {}

  ngOnInit(): void {
    listenViewportHeight();
    listenViewportWidth();
  }

  onQuestioned(animal: Animal): void {
    this.dialogService.open(DialogInfoComponent, {
      data: animal,
      ...this.dialogConfiguration.dialogs.info,
    });
  }
}
