import { TestBed, async, inject } from '@angular/core/testing';

import { VerifyLoginGuard } from './verify-login.guard';

describe('VerifyLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerifyLoginGuard]
    });
  });

  it('should ...', inject([VerifyLoginGuard], (guard: VerifyLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
