import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannelloUtenti } from './pannello-utenti';

describe('PannelloUtenti', () => {
  let component: PannelloUtenti;
  let fixture: ComponentFixture<PannelloUtenti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PannelloUtenti],
    }).compileComponents();

    fixture = TestBed.createComponent(PannelloUtenti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
