import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiPostDialog } from './aggiungi-post-dialog';

describe('AggiungiPostDialog', () => {
  let component: AggiungiPostDialog;
  let fixture: ComponentFixture<AggiungiPostDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiungiPostDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AggiungiPostDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
