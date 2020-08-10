export enum PaymentType {
  DRAWING = 'DRAWING',
  INTEREST = 'INTEREST',
  AMORTIZATION = 'AMORTIZATION'
}

export interface Schedule {
  date: Date
  type: PaymentType
  amount: number
}

export interface Deal {
  nominal:number;
  monthsDuration:number;
  interestRate:number;
}

function computeAmortization(nominal:number, monthsDuration:number) : number {
  return nominal / monthsDuration;
}

function computeInteresteAmount(principal:number, interestRate:number, periodNbOfMonths: number) : number {
  return principal * interestRate/100 * periodNbOfMonths * 30/360
}

export function computeSchedule(deal: Deal): Schedule[] {
  console.log(` ComputeSchedule with nominal ${deal.nominal}, duration ${deal.monthsDuration}, interest rate ${deal.interestRate}`)
  let schedule:Schedule[] = []
  const startDate:Date = new Date(Date.now())
  let principal:number = deal.nominal
  schedule = schedule.concat({ 
    "date": startDate,
    "type": PaymentType.DRAWING,
    "amount": -1*deal.nominal 
  })
  for(let i:number = 1; i < deal.monthsDuration; i++) {
    const paymentDate:Date = new Date(startDate.getFullYear(), startDate.getMonth()+i, startDate.getDay())
    const interestAmount:number = computeInteresteAmount(principal, deal.interestRate, 1)
    schedule = schedule.concat({ 
      "date": paymentDate,
      "type": PaymentType.INTEREST,
      "amount": interestAmount 
    })
    const amortization:number = computeAmortization(deal.nominal, deal.monthsDuration)
    schedule = schedule.concat({ 
      "date": paymentDate,
      "type": PaymentType.AMORTIZATION,
      "amount": amortization
    })
    principal = principal - amortization
  }
  return schedule
}