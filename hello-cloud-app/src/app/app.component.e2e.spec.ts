import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    const baseTime = new Date('Sat Dec 12 2020 00:00:00 GMT+0100');
    jasmine.clock().mockDate(baseTime);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('e2e compute schedule should render the schedule table', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const amount = 100;
    app.nominal = amount;
    app.monthsDuration = 2;
    app.interestRate = 1;
    const button = fixture.debugElement.nativeElement.querySelector('.btnComputeSchedule');
    button.click();
    fixture.detectChanges();
    const pDateTd = fixture.debugElement.nativeElement.querySelector('.pDate');
    expect(pDateTd.innerText).toContain('Sat Dec 12 2020');
    const pTypeTd = fixture.debugElement.nativeElement.querySelector('.pType');
    expect(pTypeTd.innerText).toContain('DRAWING');
    const pAmountTd = fixture.debugElement.nativeElement.querySelector('.pAmount');
    expect(pAmountTd.innerText).toContain(amount);
  });
});
