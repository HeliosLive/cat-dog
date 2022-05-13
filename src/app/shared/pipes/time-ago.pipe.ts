import { Pipe, PipeTransform } from '@angular/core';

import { TimeAgoEnum } from '@shared/models/time-ago.enum';

@Pipe({
  name: 'hlsTimeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(date: Date): string {
    const now = new Date();
    const seconds = Math.round(
      Math.abs((now.getTime() - date.getTime()) / 1000)
    );

    const minutes = Math.round(Math.abs(seconds / 60));
    const hours = Math.round(Math.abs(minutes / 60));
    const days = Math.round(Math.abs(hours / 24));
    const weeks = Math.round(Math.abs(days / 7));
    const months = Math.round(Math.abs(days / 30.416));
    const years = Math.round(Math.abs(days / 365));

    if (Number.isNaN(seconds)) {
      return '';
    } else if (seconds <= 45) {
      return `${TimeAgoEnum.SECONDS}`;
    } else if (seconds <= 90) {
      return `${TimeAgoEnum.MINUTE}`;
    } else if (minutes <= 45) {
      return `${minutes} ${TimeAgoEnum.MINUTES}`;
    } else if (minutes <= 90) {
      return `${TimeAgoEnum.HOUR}`;
    } else if (hours <= 22) {
      return `${hours} ${TimeAgoEnum.HOURS}`;
    } else if (hours <= 36) {
      return `${TimeAgoEnum.DAY}`;
    } else if (days <= 6) {
      return `${days} ${TimeAgoEnum.DAYS}`;
    } else if (weeks === 1) {
      return `${TimeAgoEnum.WEEK}`;
    } else if (weeks <= 4) {
      return `${weeks} ${TimeAgoEnum.WEEKS}`;
    } else if (days <= 45) {
      return `${TimeAgoEnum.MONTH}`;
    } else if (days <= 345) {
      return `${months} ${TimeAgoEnum.MONTHS}`;
    } else if (days <= 545) {
      return `${TimeAgoEnum.YEAR}`;
    } else {
      return `${years} ${TimeAgoEnum.YEARS}`;
    }
  }
}
