import { TestBed } from '@angular/core/testing';

import { IsNoConnectedGuard } from './is-no-connected.guard';

describe('IsNoConnectedGuard', () => {
  let guard: IsNoConnectedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsNoConnectedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
