import { Component, Input } from '@angular/core';

enum PaymentType {
  DRAWING = 'DRAWING',
  INTEREST = 'INTEREST',
  AMORTIZATION = 'AMORTIZATION'
}

interface Schedule {
  date: Date
  type: PaymentType
  amount: number
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

  updateModel(): void {
    this.schedulePayments = []
  }

  updateSchedule():void {
    this.schedulePayments = this.computeSchedule();
  }

  computeAmortization(nominal:number, monthsDuration:number) : number {
    return nominal / monthsDuration;
  }

  computeInteresteAmount(principal:number, interestRate:number, periodNbOfMonths: number) : number {
    return principal * interestRate * periodNbOfMonths * 30/360
  }

  computeSchedule(): Schedule[] {
    console.log(` ComputeSchedule with nominal ${this.nominal}, duration ${this.monthsDuration}, interest rate ${this.interestRate}`)
    let schedule:Schedule[] = []
    const startDate:Date = new Date(Date.now())
    let principal:number = this.nominal
    schedule = schedule.concat({ 
      "date": startDate,
      "type": PaymentType.DRAWING,
      "amount": -1*this.nominal 
    })
    for(let i:number = 1; i < this.monthsDuration; i++) {
      const paymentDate:Date = new Date(startDate.getFullYear(), startDate.getMonth()+i, startDate.getDay())
      const interestAmount:number = this.computeInteresteAmount(principal, this.interestRate, 1)
      schedule = schedule.concat({ 
        "date": paymentDate,
        "type": PaymentType.INTEREST,
        "amount": interestAmount 
      })
      const amortization:number = this.computeAmortization(this.nominal, this.monthsDuration)
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
