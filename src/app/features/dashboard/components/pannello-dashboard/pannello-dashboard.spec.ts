import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannelloDashboard } from './pannello-dashboard';

describe('PannelloDashboard', () => {
  let component: PannelloDashboard;
  let fixture: ComponentFixture<PannelloDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PannelloDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(PannelloDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
