import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSmComponent } from './profile-sm.component';

describe('ProfileSmComponent', () => {
  let component: ProfileSmComponent;
  let fixture: ComponentFixture<ProfileSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
