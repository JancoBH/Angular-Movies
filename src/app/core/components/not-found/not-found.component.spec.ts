import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotFoundComponent],
    });

    fixture = TestBed.createComponent(NotFoundComponent);
  });

  it('creates the component', async () => {
    await fixture.whenStable();

    expect(fixture.componentInstance).toBeTruthy();
  });
});
