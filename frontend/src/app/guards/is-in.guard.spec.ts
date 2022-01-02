import { TestBed } from '@angular/core/testing';

import { IsInGuard } from './is-in.guard';

describe('IsInGuard', () => {
  let guard: IsInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
