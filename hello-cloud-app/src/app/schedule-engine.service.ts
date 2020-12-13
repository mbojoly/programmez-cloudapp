export enum PaymentType { // 1
  DRAWING = 'DRAWING',
  INTEREST = 'INTEREST',
  AMORTIZATION = 'AMORTIZATION'
}

export interface Schedule { // 1
  date: Date;
  type: PaymentType;
  amount: number;
}

export interface Deal { // 1
  nominal: number;
  monthsDuration: number;
  interestRate: number;
}

function computeAmortization(nominal: number, monthsDuration: number): number { // 2
  return nominal / monthsDuration;
}

function computeInterestAmount(principal: number, interestRate: number, periodNbOfMonths: number): number { // 3
  return principal * interestRate / 100 * periodNbOfMonths * 30 / 360;
}

export function computeSchedule(deal: Deal): Schedule[] { // 4
  console.log(` ComputeSchedule with nominal ${deal.nominal}, duration ${deal.monthsDuration}, interest rate ${deal.interestRate}`);
  let schedule: Schedule[] = [];
  const startDate: Date = new Date(Date.now());
  let principal: number = deal.nominal;
  schedule = schedule.concat({
    date : startDate,
    type : PaymentType.DRAWING,
    amount : -1 * deal.nominal
  });
  for (let i = 1; i <= deal.monthsDuration; i++) {
    const paymentDate: Date = new Date(startDate.getFullYear(), startDate.getMonth() + i, startDate.getDay());
    const interestAmount: number = computeInterestAmount(principal, deal.interestRate, 1);
    schedule = schedule.concat({
      date: paymentDate,
      type: PaymentType.INTEREST,
      amount: interestAmount
    });
    const amortization: number = computeAmortization(deal.nominal, deal.monthsDuration);
    schedule = schedule.concat({
      date: paymentDate,
      type: PaymentType.AMORTIZATION,
      amount: amortization
    });
    principal = principal - amortization;
  }
  return schedule;
}
