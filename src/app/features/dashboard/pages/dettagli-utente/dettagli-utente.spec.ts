import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliUtente } from './dettagli-utente';

describe('DettagliUtente', () => {
  let component: DettagliUtente;
  let fixture: ComponentFixture<DettagliUtente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettagliUtente],
    }).compileComponents();

    fixture = TestBed.createComponent(DettagliUtente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
