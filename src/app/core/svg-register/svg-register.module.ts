import { NgModule } from '@angular/core';
import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';

import { ActionIcons } from './action-icons.enum';
import { PersonIcons } from './person-icons.enum';
import { AnimalIcons } from './animal-icons.enum';
import { EmojiIcons } from './emoji-icons.enum';

@NgModule({
  imports: [AngularSvgIconModule.forRoot()],
})
export class SvgRegisterModule {
  constructor(private iconReg: SvgIconRegistryService) {
    /* actions */
    this.iconReg
      .loadSvg('assets/svg/action/heart.svg', ActionIcons.heart)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/action/question-mark.svg', ActionIcons.questionMark)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/action/dots.svg', ActionIcons.dots)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/action/save.svg', ActionIcons.save)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/action/hide.svg', ActionIcons.hide)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/action/report.svg', ActionIcons.report)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/action/cancel.svg', ActionIcons.cancel)
      ?.subscribe();

    /* people */
    this.iconReg
      .loadSvg('assets/svg/person/male.svg', PersonIcons.male)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/person/female.svg', PersonIcons.female)
      ?.subscribe();

    /* animals */
    this.iconReg
      .loadSvg('assets/svg/animal/cat.svg', AnimalIcons.cat)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/animal/dog.svg', AnimalIcons.dog)
      ?.subscribe();

    /* emojis */
    this.iconReg
      .loadSvg('assets/svg/emoji/amazed.svg', EmojiIcons.amazed)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/emoji/embarrassed.svg', EmojiIcons.embarrassed)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/emoji/laughing.svg', EmojiIcons.laughing)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/emoji/indifferent.svg', EmojiIcons.indifferent)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/emoji/happiness.svg', EmojiIcons.happiness)
      ?.subscribe();
    this.iconReg
      .loadSvg('assets/svg/emoji/crying.svg', EmojiIcons.crying)
      ?.subscribe();
  }
}
