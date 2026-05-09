import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiUtenteDialog } from './aggiungi-utente-dialog';

describe('AggiungiUtenteDialog', () => {
  let component: AggiungiUtenteDialog;
  let fixture: ComponentFixture<AggiungiUtenteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiungiUtenteDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AggiungiUtenteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
