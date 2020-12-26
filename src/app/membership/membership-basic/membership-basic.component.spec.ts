import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipBasicComponent } from './membership-basic.component';

describe('MembershipBasicComponent', () => {
  let component: MembershipBasicComponent;
  let fixture: ComponentFixture<MembershipBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
