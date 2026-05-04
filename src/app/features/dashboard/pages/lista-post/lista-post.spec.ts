import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPost } from './lista-post';

describe('ListaPost', () => {
  let component: ListaPost;
  let fixture: ComponentFixture<ListaPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPost],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
