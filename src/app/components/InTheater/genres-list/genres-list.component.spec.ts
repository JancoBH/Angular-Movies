import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresListComponent } from './genres-list.component';

describe('GenresListComponent', () => {
  let component: GenresListComponent;
  let fixture: ComponentFixture<GenresListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenresListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
