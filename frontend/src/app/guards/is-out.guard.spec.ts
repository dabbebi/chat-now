import { TestBed } from '@angular/core/testing';

import { IsOutGuard } from './is-out.guard';

describe('IsOutGuard', () => {
  let guard: IsOutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
