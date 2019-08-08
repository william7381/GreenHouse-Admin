import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesPlateComponent } from './types-plate.component';

describe('TypesPlateComponent', () => {
  let component: TypesPlateComponent;
  let fixture: ComponentFixture<TypesPlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesPlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
