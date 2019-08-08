import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicedComponent } from './invoiced.component';

describe('InvoicedComponent', () => {
  let component: InvoicedComponent;
  let fixture: ComponentFixture<InvoicedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
