import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

export type Action = 'save' | 'hide' | 'report';

@Component({
  selector: 'hls-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionComponent {
  @Input() isSaved = false;

  @Input()
  @HostBinding('attr.data-cy')
  testId?: string;

  actions: Action[] = ['save', 'hide', 'report'];

  isActive(action: Action): boolean {
    return action === 'save' && this.isSaved;
  }
}
