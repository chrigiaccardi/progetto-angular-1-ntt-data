import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannelloDashboard } from './pannello-dashboard';
import { provideRouter } from '@angular/router';

describe('PannelloDashboard', () => {
  let component: PannelloDashboard;
  let fixture: ComponentFixture<PannelloDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PannelloDashboard],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PannelloDashboard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('titolo', 'Ciaoo')
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
