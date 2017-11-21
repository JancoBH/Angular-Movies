import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTvShowsComponent } from './all-tv-shows.component';

describe('AllTvShowsComponent', () => {
  let component: AllTvShowsComponent;
  let fixture: ComponentFixture<AllTvShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTvShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
