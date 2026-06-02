import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCommentiPost } from './lista-commenti-post';
import { provideRouter } from '@angular/router';

describe('ListaCommentiPost', () => {
  let component: ListaCommentiPost;
  let fixture: ComponentFixture<ListaCommentiPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCommentiPost],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCommentiPost);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('commento', {
      id: '3',
      post_id: '222',
      name: 'Kelgin',
      email: 'kelgin@example.com',
      body: 'Test Commento'
    })
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
