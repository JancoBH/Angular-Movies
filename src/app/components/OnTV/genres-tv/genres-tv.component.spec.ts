import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresTvComponent } from './genres-tv.component';

describe('GenresTvComponent', () => {
  let component: GenresTvComponent;
  let fixture: ComponentFixture<GenresTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenresTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
