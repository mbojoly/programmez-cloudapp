import {computeSchedule, Deal, PaymentType, Schedule} from './schedule-engine.service';


describe('schedule-engine', () => {
  it('should compute the schedule', () => {
    const deal: Deal = {
      nominal: 100,
      monthsDuration: 2,
      interestRate: 1
    };
    const baseTime = new Date('Sat Dec 12 2020 00:00:00 GMT+0100');
    jasmine.clock().mockDate(baseTime);
    const schedule: Schedule[] = computeSchedule(deal);
    expect(schedule).toEqual([
      { date: new Date('Sat Dec 12 2020 00:00:00 GMT+0100'), type: PaymentType.DRAWING, amount: -100},
      { date: new Date('Wed Jan 06 2021 00:00:00 GMT+0100'), type: PaymentType.INTEREST, amount: 0.08333333333333333},
      { date: new Date('Wed Jan 06 2021 00:00:00 GMT+0100'), type: PaymentType.AMORTIZATION, amount: 50},
      { date: new Date('Sat Feb 06 2021 00:00:00 GMT+0100'), type: PaymentType.INTEREST, amount: 0.041666666666666664},
      { date: new Date('Sat Feb 06 2021 00:00:00 GMT+0100'), type: PaymentType.AMORTIZATION, amount: 50}
      ]);
  });
});
