import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannelloPost } from './pannello-post';

describe('PannelloPost', () => {
  let component: PannelloPost;
  let fixture: ComponentFixture<PannelloPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PannelloPost],
    }).compileComponents();

    fixture = TestBed.createComponent(PannelloPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
