import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipCoreComponent } from './membership-core.component';

describe('MembershipCoreComponent', () => {
  let component: MembershipCoreComponent;
  let fixture: ComponentFixture<MembershipCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
