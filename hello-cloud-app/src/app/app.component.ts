import { Component } from '@angular/core'; // 1
import { Schedule, computeSchedule } from './schedule-engine.service'; // 2

@Component({ // 3
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nominal: number = 0; // 4
  monthsDuration: number = 0;
  interestRate: number = 0;
  schedulePayments: Schedule[] = [];

  clearModel(): void { // 5
    this.schedulePayments = [];
  }

  renderSchedule(): void { // 6
    this.schedulePayments = computeSchedule({
      nominal: this.nominal,
      monthsDuration: this.monthsDuration,
      interestRate: this.interestRate
    });
  }
}
