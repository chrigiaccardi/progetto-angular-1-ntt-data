import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnIndietro } from './btn-indietro';

describe('BtnIndietro', () => {
  let component: BtnIndietro;
  let fixture: ComponentFixture<BtnIndietro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnIndietro],
    }).compileComponents();

    fixture = TestBed.createComponent(BtnIndietro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
