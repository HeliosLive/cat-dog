import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

export type TextType =
  | 'heading'
  | 'subheading'
  | 'title'
  | 'subtitle'
  | 'p'
  | 'span'
  | 'caption';

@Component({
  selector: 'hls-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent {
  @Input() pointer?: boolean;
  @Input() ellipsis?: boolean;
  @Input() underline?: boolean;
  @Input() disabled?: boolean;

  @Input()
  @HostBinding('attr.data-type')
  type: TextType = 'p';

  @Input()
  @HostBinding('attr.data-cy')
  testId?: string;

  @HostBinding('class.hls-text-ellipsis')
  get isEllipsis(): string | void {
    if (this.ellipsis) {
      return `${this.ellipsis}`;
    }
  }

  @HostBinding('class.hls-text-underline')
  get isUnderline(): string | void {
    if (this.underline) {
      return `${this.underline}`;
    }
  }

  @HostBinding('class.hls-text-disabled')
  get isDisabled(): string | void {
    if (this.disabled) {
      return `${this.disabled}`;
    }
  }

  @HostBinding('class.hls-text-pointer')
  get isPointer(): string | void {
    if (this.pointer) {
      return `${this.pointer}`;
    }
  }
}
