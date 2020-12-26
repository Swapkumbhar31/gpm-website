import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsMainComponent } from './about-us-main.component';

describe('AboutUsMainComponent', () => {
  let component: AboutUsMainComponent;
  let fixture: ComponentFixture<AboutUsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutUsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
