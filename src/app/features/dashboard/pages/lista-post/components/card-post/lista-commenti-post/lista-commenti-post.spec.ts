import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCommentiPost } from './lista-commenti-post';

describe('ListaCommentiPost', () => {
  let component: ListaCommentiPost;
  let fixture: ComponentFixture<ListaCommentiPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCommentiPost],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCommentiPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
