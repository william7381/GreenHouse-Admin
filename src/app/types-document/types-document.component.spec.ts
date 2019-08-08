import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesDocumentComponent } from './types-document.component';

describe('TypesPlateComponent', () => {
  let component: TypesDocumentComponent;
  let fixture: ComponentFixture<TypesDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
