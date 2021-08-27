import { TestBed } from '@angular/core/testing';

import { AccessProtectGuard } from './access-protect.guard';

describe('AccessProtectGuard', () => {
  let guard: AccessProtectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccessProtectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
