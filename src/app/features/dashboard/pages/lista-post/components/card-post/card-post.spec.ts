import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPost } from './card-post';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { PostsStore } from '../../../../../../core/store/postsStore/posts-store';
import { By } from '@angular/platform-browser';

describe('CardPost', () => {
  let component: CardPost;
  let fixture: ComponentFixture<CardPost>;

  // Mockiamo gli store 
  const postsStoreMock = {
    getNomeUtente: vi.fn().mockReturnValue('Mario Rossi'),
    caricamento: signal(false),
    errore: signal(undefined),
    posts: signal([]),
  };
  const commentiStoreMock = {
    postIdSelezionato: signal(null),
    numeroCommenti: signal(undefined),
    caricamentoCommenti: signal(false),
    erroreCommenti: signal(undefined),
    commentiPost: signal([]),
    setIdPost: vi.fn()
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPost],
      providers: [
        { provide: PostsStore, useValue: postsStoreMock},
        provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CardPost);
    // Impostiamo in input un mockPost per non avere errori nel test
    component = fixture.componentInstance;
    fixture.componentRef.setInput('post', {
      id: '2',
      user_id: '1234',
      title: 'Test Post',
      body: 'Body Post'
    })
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Dovrebbero visualizzarsi titolo e body', () => {
    // Applichiamo i cambiamenti
    fixture.detectChanges()
    // Selezioniamo h2 per il titolo e p per il body
    const titolo = fixture.debugElement.query(By.css('h2'))
    const body = fixture.debugElement.query(By.css('p'))
    
    expect(titolo.nativeElement.textContent).toContain('Test Post')
    expect(body.nativeElement.textContent).toContain('Body Post')
  })
});
