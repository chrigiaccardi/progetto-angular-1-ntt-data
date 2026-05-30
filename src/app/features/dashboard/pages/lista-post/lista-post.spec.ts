import { ComponentFixture, TestBed } from '@angular/core/testing';
import  ListaPost  from './lista-post';
import { PostsStore } from '../../../../core/store/postsStore/posts-store';
import { By } from '@angular/platform-browser';
import { computed, Signal, signal, WritableSignal } from '@angular/core';
import { Post } from '../../../../core/models/post';
import { provideRouter } from '@angular/router';


describe('ListaPost', () => {
  let component: ListaPost;
  let fixture: ComponentFixture<ListaPost>;

  // Dichiariamo i mock degli store e i metodi che utilizziamo
  let postsStoreMock: {
    caricamento: WritableSignal<boolean>
    posts: WritableSignal<Post[]>
    errore: WritableSignal<Error | undefined>
    paginaCorrente: WritableSignal<number>
    itemXPagina: WritableSignal<number>
    paginaSuccessiva: Signal<number>
    paginaPrecedente: Signal<number>
    opzioniItemPagina: Signal<number[]>

    andareAPagina: ReturnType<typeof vi.fn>
    itemPerPagina: ReturnType<typeof vi.fn>
    getNomeUtente: ReturnType<typeof vi.fn>


  }

  beforeEach(async () => {
    // Creiamo i mock dei store e i metodi che utilizziamo e gli diamo i valori di partenza
    postsStoreMock = {
      caricamento: signal(false),
      posts: signal([]),
      errore: signal(undefined),
      paginaCorrente: signal(2),
      itemXPagina: signal(5),
      paginaSuccessiva: computed(() => postsStoreMock.paginaCorrente() + 1),
      paginaPrecedente: computed(() => postsStoreMock.paginaCorrente() - 1),
      opzioniItemPagina: signal([]),
      
      andareAPagina: vi.fn(),
      itemPerPagina: vi.fn(),
      getNomeUtente: vi.fn(),
    }

  

    await TestBed.configureTestingModule({
      imports: [ListaPost],
      providers: [
        { provide: PostsStore, useValue: postsStoreMock },
        // Quando nel HTML abbiamo un routerLink, Router Outlet ActivatedRoute ecc. utilizziamo provideRouter
        provideRouter([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  // Inizio test

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Dovrebbe comparire la scritta caricamento quando caricamento è true', () => {
    // Impostiamo il valore di caricamento in true e renderizziamo il DOM
    postsStoreMock.caricamento.set(true)
    fixture.detectChanges()

    // Cerchiamo nel DOM l'elemento nativo (p) che contiene la Caricamento...
    const elementoNativo = fixture.nativeElement

    // Ci aspettiamo che contenga la scritta caricamento
    expect(elementoNativo.textContent).toContain('Caricamento Dati')
  })

  it('Dovrebbero comparire le card posts quando restituisce la lista posts', () => {
    // Impostiamo tre post differenti dentro il ritorno della lista e renderizziamo il DOM
    postsStoreMock.posts.set([
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
    postsStoreMock.caricamento.set(false)
    postsStoreMock.errore.set(undefined)
    postsStoreMock.posts.set([])

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
    // Ci aspettiamo che la chiamata restituisca 3 - Utilizziamo toHaveBeenCalledWith
    // perchè ha argomento in ingresso, senza with non ha argomenti
    expect(postsStoreMock.andareAPagina).toHaveBeenCalledWith(3)

    // NB - In questo caso non facciamo SpyON perchè il metodo è già vi.fn() nel mock
  })

});
