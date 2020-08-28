import { Component, Input } from '@angular/core';
import { Schedule, computeSchedule } from './schedule-engine.service'

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
    this.schedulePayments = computeSchedule({
      nominal:this.nominal,
      monthsDuration:this.monthsDuration,
      interestRate:this.interestRate
    });
  }
}
