import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyProviderComponent } from './daily-provider.component';

describe('DailyProviderComponent', () => {
  let component: DailyProviderComponent;
  let fixture: ComponentFixture<DailyProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
