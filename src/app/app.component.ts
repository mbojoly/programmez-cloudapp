import { Component, Input } from '@angular/core';

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

export class ScheduleEngineService {

  computeAmortization(nominal:number, monthsDuration:number) : number {
    return nominal / monthsDuration;
  }

  computeInteresteAmount(principal:number, interestRate:number, periodNbOfMonths: number) : number {
    return principal * interestRate/100 * periodNbOfMonths * 30/360
  }

  computeSchedule(deal: Deal): Schedule[] {
    console.log(` ComputeSchedule with nominal ${deal.nominal}, duration ${deal.monthsDuration}, interest rate ${this.interestRate}`)
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
      const interestAmount:number = this.computeInteresteAmount(principal, deal.interestRate, 1)
      schedule = schedule.concat({ 
        "date": paymentDate,
        "type": PaymentType.INTEREST,
        "amount": interestAmount 
      })
      const amortization:number = this.computeAmortization(deal.nominal, deal.monthsDuration)
      schedule = schedule.concat({ 
        "date": paymentDate,
        "type": PaymentType.AMORTIZATION,
        "amount": amortization
      })
      principal = principal - amortization
    }
    return schedule
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  counter: number = 0;
  title : string = 'hello-angular';

  nominal:number;
  monthsDuration:number;
  interestRate:number;
  schedulePayments:Schedule[] = []

  clearModel(): void {
    this.schedulePayments = []
  }

  renderSchedule():void {
    const service:ScheduleEngineService = new ScheduleEngineService()
    this.schedulePayments = service.computeSchedule({
      nominal:this.nominal,
      monthsDuration:this.monthsDuration,
      interestRate:this.interestRate
    });
  }
}
