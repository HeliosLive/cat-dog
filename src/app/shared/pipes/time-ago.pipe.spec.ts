import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { TimeAgoPipe } from './time-ago.pipe';

import { TimeAgoEnum } from '@shared/models/time-ago.enum';

describe('TimeAgoPipe', () => {
  const createService = createServiceFactory({
    service: TimeAgoPipe,
  });
  const seconds = 60;

  let spectator: SpectatorService<TimeAgoPipe>;

  beforeEach(() => {
    spectator = createService();
  });

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('transform', () => {
    describe('second', () => {
      it('should return empty string if seconds is NaN', () => {
        const date = new Date('');

        const time = spectator.service.transform(date);
        expect(time).toEqual('');
      });

      it('should return single without prefix', () => {
        const date = new Date(Date.now() - 20);

        const time = spectator.service.transform(date);
        expect(time).toEqual(`${TimeAgoEnum.SECONDS}`);
      });
    });

    describe('minute', () => {
      it('should return single without prefix', () => {
        const date = new Date(Date.now() - 1000 * seconds);

        const time = spectator.service.transform(date);
        expect(time).toEqual(`${TimeAgoEnum.MINUTE}`);
      });

      it('should return plural with prefix', () => {
        const minutes = 11;
        const date = new Date(Date.now() - 1000 * seconds * minutes);

        const time = spectator.service.transform(date);
        expect(time).toEqual(`${minutes} ${TimeAgoEnum.MINUTES}`);
      });
    });

    describe('hour', () => {
      it('should return single without prefix', () => {
        const date = new Date(Date.now() - 1000 * Math.pow(seconds, 2));

        const time = spectator.service.transform(date);
        expect(time).toEqual(`${TimeAgoEnum.HOUR}`);
      });

      it('should return plural with prefix', () => {
        const hours = 11;
        const date = new Date(Date.now() - 1000 * Math.pow(seconds, 2) * hours);

        const time = spectator.service.transform(date);
        expect(time).toEqual(`${hours} ${TimeAgoEnum.HOURS}`);
      });
    });

    describe('day', () => {
      it('should return single without prefix', () => {
        const date = new Date(Date.now() - 1000 * Math.pow(seconds, 2) * 24);

        const time = spectator.service.transform(date);
        expect(time).toEqual(`${TimeAgoEnum.DAY}`);
      });

      it('should return plural with prefix', () => {
        const days = 4;
        const date = new Date(
          Date.now() - 1000 * Math.pow(seconds, 2) * 24 * days
        );

        const time = spectator.service.transform(date);
        expect(time).toEqual(`${days} ${TimeAgoEnum.DAYS}`);
      });
    });

    describe('week', () => {
      it('should return single without prefix', () => {
        const date = new Date(
          Date.now() - 1000 * Math.pow(seconds, 2) * 24 * 7
        );

        const time = spectator.service.transform(date);
        expect(time).toEqual(`${TimeAgoEnum.WEEK}`);
      });

      it('should return plural with prefix', () => {
        const weeks = 3;
        const date = new Date(
          Date.now() - 1000 * Math.pow(seconds, 2) * 24 * 7 * weeks
        );

        const time = spectator.service.transform(date);
        expect(time).toEqual(`${weeks} ${TimeAgoEnum.WEEKS}`);
      });
    });

    describe('month', () => {
      it('should return single without prefix', () => {
        const date = new Date(
          Date.now() - 1000 * Math.pow(seconds, 2) * 24 * 7 * 5
        );

        const time = spectator.service.transform(date);
        expect(time).toEqual(`${TimeAgoEnum.MONTH}`);
      });

      it('should return plural with prefix', () => {
        const months = 3;
        const date = new Date(
          Date.now() - 1000 * Math.pow(seconds, 2) * 24 * 7 * 4 * months
        );

        const time = spectator.service.transform(date);
        expect(time).toEqual(`${months} ${TimeAgoEnum.MONTHS}`);
      });
    });

    describe('year', () => {
      it('should return single without prefix', () => {
        const date = new Date(
          Date.now() - 1000 * Math.pow(seconds, 2) * 24 * 7 * 5 * 12
        );

        const time = spectator.service.transform(date);
        expect(time).toEqual(`${TimeAgoEnum.YEAR}`);
      });

      it('should return plural with prefix', () => {
        const years = 3;
        const date = new Date(
          Date.now() - 1000 * Math.pow(seconds, 2) * 24 * 7 * 5 * 12 * years
        );

        const time = spectator.service.transform(date);
        expect(time).toEqual(`${years} ${TimeAgoEnum.YEARS}`);
      });
    });
  });
});
