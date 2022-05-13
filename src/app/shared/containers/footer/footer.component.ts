import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

import type { Gender } from '@shared/models/gender.type';
import type { Section } from '@shared/models/section.type';

@Component({
  selector: 'hls-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() gender: Gender = 'male';

  @Input()
  @HostBinding('attr.data-cy')
  testId?: string;

  sections: Section[] = ['cat', 'user', 'dog'];
  selectedSection: Section = 'cat';

  @Output() selected: EventEmitter<Section> = new EventEmitter();

  onSelect(section: Section): void {
    this.selectedSection = section;
    this.selected.emit(section);
  }
}
