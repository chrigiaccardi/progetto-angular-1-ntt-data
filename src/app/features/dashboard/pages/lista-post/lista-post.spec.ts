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
    errore: ReturnType<typeof vi.fn>
    paginaSuccessiva: ReturnType<typeof vi.fn>
    paginaCorrente: ReturnType<typeof vi.fn>
    andareAPagina: ReturnType<typeof vi.fn>
    
  }

  beforeEach(async () => {
    // Creiamo i mock dei store e i metodi che utilizziamo
    postsStoreMock = {
      caricamento: vi.fn(),
      posts: vi.fn(),
      errore: vi.fn(),
      paginaSuccessiva: vi.fn(),
      paginaCorrente: vi.fn(),
      andareAPagina: vi.fn(),
    }

    // Impostiamo i valori di default per il template
    postsStoreMock.caricamento.mockReturnValue(false)
    postsStoreMock.posts.mockReturnValue([])
    postsStoreMock.errore.mockReturnValue(null)

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

  it('Dovrebbe vedersi il messaggio di empty state in array posts', () => {
    // Essendo che posts, nel file HTML, nell'if - else if, è al terzo posto dobbiamo impostare anche gli altri
    // Affinchè si arrivi a quello stato
    postsStoreMock.caricamento.mockReturnValue(false)
    postsStoreMock.errore.mockReturnValue(null)
    postsStoreMock.posts.mockReturnValue([])

    fixture.detectChanges();

    const elementoNativo = fixture.nativeElement
    expect(elementoNativo.textContent).toContain('0 Utenti trovati.')
  })

  it('Dovrebbe aprire il dialog quando clicco il bottone indicato', () => {
    // Renderizziamo il DOM subito visto che non abbiamo variazioni
    fixture.detectChanges()
    // Troviamo tutti i bottoni
    const bottoni = fixture.debugElement.queryAll(By.css('button'))
    // Cerchiamo tra i botoni quello con il textContent giusto.
    // Se find non trova nulla restituisce undefined quindi dopo ci assicuriamo che esista
    // trim() toglie gli spazi all'inizio e alla fine
    const btnApriDialog = bottoni.find(btn => 
      btn.nativeElement.textContent.trim().includes('Aggiungi Nuovo Post')
    )
    // Ci assicuriamo che il btn esista
    expect(btnApriDialog).toBeDefined()
    // SpyOn intercetta il metodo e lo registra (Va messo prima del trigger che lo scatena)
    const aperturaDialog = vi.spyOn(component, 'apriDialogAggiungiPost')
    // Essendo un bottone con una azione normale con il click usiamo questa sintassi
    // al posto di triggerEventHandler (! per confermare che il btn esiste per forza)
    btnApriDialog!.nativeElement.click()
    // Ci aspettiamo che la chiamata sia effettuata
    expect(aperturaDialog).toHaveBeenCalled()
  })

  it('Dovrebbe cambiare pagina(numero) al click Avanti', () => {
    // Impostiamo pagina corrente a 3 e successiva a 4
    postsStoreMock.paginaCorrente.mockReturnValue(3)
    postsStoreMock.paginaSuccessiva.mockReturnValue(4)
    // Renderizziamo il DOM
    fixture.detectChanges()
    // Troviamo il bottone Avanti
    const bottoni = fixture.debugElement.queryAll(By.css('button'))
    const btnAvanti = bottoni.find(btn => 
      btn.nativeElement.textContent.trim().includes('Avanti') 
    )
    // Controlliamo se btnAvanti esiste
    expect(btnAvanti).toBeDefined()
    // Avviamo il click
    btnAvanti?.nativeElement.click()
    // Ci aspettiamo che la chiamata restituisca 4 - Utilizziamo toHaveBeenCalledWith
    // perchè ha argomento in ingresso, senza with non ha argomenti
    expect(postsStoreMock.andareAPagina).toHaveBeenCalledWith(4)

    // NB - In questo caso non facciamo SpyON perchè il metodo è già vi.fn() nel mock
  })

});

