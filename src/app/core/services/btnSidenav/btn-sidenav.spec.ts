import { TestBed } from '@angular/core/testing';

import { BtnSidenav } from './btn-sidenav';

describe('BtnSidenav', () => {
  let service: BtnSidenav;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtnSidenav);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
