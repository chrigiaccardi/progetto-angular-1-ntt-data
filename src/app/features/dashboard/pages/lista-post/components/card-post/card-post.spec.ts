import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPost } from './card-post';

describe('CardPost', () => {
  let component: CardPost;
  let fixture: ComponentFixture<CardPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPost],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
