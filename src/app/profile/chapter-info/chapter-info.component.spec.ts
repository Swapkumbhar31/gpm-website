import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterInfoComponent } from './chapter-info.component';

describe('ChapterInfoComponent', () => {
  let component: ChapterInfoComponent;
  let fixture: ComponentFixture<ChapterInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
