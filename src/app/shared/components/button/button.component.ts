import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';

import type { TextType } from '../text/text.component';

export type ButtonColor = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger' | 'light';

const BUTTON_HOST_ATTRIBUTES = ['hls-button', 'hls-raised-button', 'hls-outlined-button'];

@Component({
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  selector: `button[hls-button], button[hls-raised-button], button[hls-outlined-button]`,
  exportAs: 'hlsButton',
  host: {
    '[attr.disabled]': 'disabled || null',
    '[class.hls-button-disabled]': 'disabled',
  },
  inputs: ['disabled'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input() textType: TextType = 'subtitle';

  @Input()
  @HostBinding('attr.color')
  color: ButtonColor = 'primary';

  @Input()
  @HostBinding('attr.data-cy')
  testId?: string;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.checkButtonAttributes();
  }

  private checkButtonAttributes() {
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this.hasHostAttributes(attr)) {
        (this.getHostElement() as HTMLElement).classList.add(attr);
      }
    }
  }

  private hasHostAttributes(...attributes: string[]) {
    return attributes.some((attribute) => this.getHostElement().hasAttribute(attribute));
  }

  private getHostElement() {
    return this.elementRef.nativeElement;
  }
}
