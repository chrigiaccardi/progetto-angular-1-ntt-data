import { ComponentFixture, TestBed } from '@angular/core/testing';

import  ListaPost  from './lista-post';
import { PostsStore } from '../../../../core/store/postsStore/posts-store';
import { By } from '@angular/platform-browser';

describe('ListaPost', () => {
  let component: ListaPost;
  let fixture: ComponentFixture<ListaPost>;
  let postsStore: InstanceType<typeof PostsStore>

  // Dichiariamo i mock degli store e i metodi che utilizziamo
  let postsStoreMock: {
    caricamento: ReturnType<typeof vi.fn>
    posts: ReturnType<typeof vi.fn>
  
  }

  beforeEach(async () => {
    // Creiamo i mock dei store e i metodi che utilizziamo
    postsStoreMock = {
      caricamento: vi.fn(),
      posts: vi.fn(),
    }

    // Impostiamo i valori di default per il template
    postsStoreMock.caricamento.mockReturnValue(false)
    postsStoreMock.posts.mockReturnValue([])


    await TestBed.configureTestingModule({
      imports: [ListaPost],
      providers: [
        {provide: PostsStore, useValue: postsStoreMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Dovrebbe comparire la scritta caricamento quando caricamento è true', () => {
    // Impostiamo il valore di caricamento in true e renderizziamo il DOM
    postsStoreMock.caricamento.mockReturnValue(true)
    fixture.detectChanges()

    // Cerchiamo nel DOM l'elemento nativo (p) che contiene la Caricamento...
    const elementoNativo = fixture.nativeElement

    // Ci aspettiamo che contenga la scritta caricamento
    expect(elementoNativo.textContent).toContain('Caricamento Dati')
  })

  it('Dovrebbero comparire le card posts quando restituisce la lista posts', () => {
    // Impostiamo tre post differenti dentro il ritorno della lista e renderizziamo il DOM
    postsStoreMock.posts.mockReturnValue([
      {id: '10', user_id: '23', title: 'Titolo 1', body: 'Body 1'},
      {id: '11', user_id: '24', title: 'Titolo 2', body: 'Body 2'},
      {id: '12', user_id: '25', title: 'Titolo 3', body: 'Body 3'}
    ])
    fixture.detectChanges()

    // Cerchiamo nel DOM tutti gli elementi cardPost creati
    const cardsPost = fixture.debugElement.queryAll(
      By.css('app-card-post')
    )

    // Ci aspettiamo che cardPost sia 3
    expect(cardsPost.length).toBe(3)
  })

  it('', () => {

  })

  it('', () => {

  })

  it('', () => {

  })

});

// 1. loading state - caricamento dati e spinner
// 2. card compaiono nel DOM - è il cuore quindi va coperto
// 3. messaggio di empty state quando l'array dei post è vuoto
// 4. Tasto avanti per la paginazione collegata correttamente
// 5. apri dialog al click