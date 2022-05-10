import { NgModule } from '@angular/core';
import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';

import { actionIcons } from './action-icons';
import { personIcons } from './person-icons';
import { animalIcons } from './animal-icons';
import { emojiIcons } from './emoji-icons';

@NgModule({
  imports: [AngularSvgIconModule.forRoot()],
})
export class SvgRegisterModule {
  constructor(private iconReg: SvgIconRegistryService) {
    /* actions */
    this.iconReg
      .loadSvg('assets/svg/action/heart.svg', actionIcons.heart)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/action/question-mark.svg', actionIcons.questionMark)
      ?.subscribe();

    /* people */
    this.iconReg
      .loadSvg('assets/svg/person/male.svg', personIcons.male)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/person/female.svg', personIcons.female)
      ?.subscribe();

    /* animals */
    this.iconReg
      .loadSvg('assets/svg/animal/cat.svg', animalIcons.cat)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/animal/dog.svg', animalIcons.dog)
      ?.subscribe();

    /* emojis */
    this.iconReg
      .loadSvg('assets/svg/emoji/amazed.svg', emojiIcons.amazed)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/emoji/embarrassed.svg', emojiIcons.embarrassed)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/emoji/laughing.svg', emojiIcons.laughing)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/emoji/indifferent.svg', emojiIcons.indifferent)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/emoji/happiness.svg', emojiIcons.happiness)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/emoji/crying.svg', emojiIcons.crying)
      ?.subscribe();
  }
}
