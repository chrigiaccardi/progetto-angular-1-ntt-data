import { TestBed } from '@angular/core/testing';

import { BarraDiRicerca } from './barra-di-ricerca';

describe('BarraDiRicerca', () => {
  let service: BarraDiRicerca;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarraDiRicerca);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
