import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPost } from './card-post';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { PostsStore } from '../../../../../../core/store/postsStore/posts-store';
import { By } from '@angular/platform-browser';
import { Post } from '../../../../../../core/models/post';

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
  // Mockiamo il post in input nel component
  const mockPost: Post = {
      id: '2',
      user_id: '1234',
      title: 'Test Post',
      body: 'Body Post'
    }

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
    fixture.componentRef.setInput('post', mockPost )
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
    // Ci aspettiamo che titolo e body siano identici al postMock in input
    expect(titolo.nativeElement.textContent).toContain(mockPost.title)
    expect(body.nativeElement.textContent).toContain(mockPost.body)
  })

  it('Dovrebbe essere true al chiamare il metodo leggi tutto', () => {
    fixture.detectChanges()
    // Ci assicuriamo che all'inizio sia false
    expect(component.espansione()).toBe(false)
    // Selezioniamo il bottone da testare
    const bottoni = fixture.debugElement.queryAll(By.css('button'))
    const btnleggiTutto = bottoni[0]
    // Avviamo l'evento click con nulla in ingresso
    btnleggiTutto.triggerEventHandler('click', null)
    fixture.detectChanges()
    // Ci aspettiamo che espansione sia true e che il cottone cambi e contenga Mostra Meno
    expect(component.espansione()).toBe(true)
    expect(btnleggiTutto.nativeElement.textContent.trim()).toContain('Mostra Meno')
  })
});
