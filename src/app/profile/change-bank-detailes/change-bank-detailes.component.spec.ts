import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBankDetailesComponent } from './change-bank-detailes.component';

describe('ChangeBankDetailesComponent', () => {
  let component: ChangeBankDetailesComponent;
  let fixture: ComponentFixture<ChangeBankDetailesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeBankDetailesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBankDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
