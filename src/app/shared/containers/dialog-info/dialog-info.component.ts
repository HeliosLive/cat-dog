import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Output,
} from '@angular/core';

import { EmojiIcons } from '@core/svg-register/emoji-icons.enum';
import { DialogRef } from '@shared/services/dialog/dialog-ref';
import { DIALOG_DATA } from '@shared/services/dialog/dialog-tokens';

@Component({
  selector: 'hls-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogInfoComponent {
  @Input()
  @HostBinding('attr.data-cy')
  testId = 'dialog-info-modal';

  @Output() reaction: EventEmitter<EmojiIcons> = new EventEmitter();

  emojis = Object.keys(EmojiIcons).map((name) => {
    return name as EmojiIcons;
  });
  panelClass = 'dialog-info-panel';
  fadeOutTime = 1500;

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: string
  ) {}

  onReaction(emoji: EmojiIcons): void {
    this.filterEmojis(emoji);
    this.reaction.emit(emoji);

    setTimeout(() => {
      this.onClose();
    }, this.fadeOutTime);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  private filterEmojis(emoji: EmojiIcons): void {
    this.emojis = this.emojis.filter((el) => el === emoji);
  }
}
