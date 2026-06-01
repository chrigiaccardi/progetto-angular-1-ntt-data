import { ComponentFixture, TestBed } from '@angular/core/testing';
import  DettagliUtente  from './dettagli-utente'
import { UtentiStore } from '../../../../core/store/utentiStore/utenti-store';
import { PostsStore } from '../../../../core/store/postsStore/posts-store';
import { CommentiStore } from '../../../../core/store/commentiStore/commenti-store';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('DettagliUtente', () => {
  let component: DettagliUtente;
  let fixture: ComponentFixture<DettagliUtente>;
  let utentiStore: InstanceType<typeof UtentiStore>
  let postsStore: InstanceType<typeof PostsStore>
  let commentiStore: InstanceType<typeof CommentiStore>

  // Dichiariamo il tipo delle variabili mock con all'interno i moduli
  let utentiStoreMock: {
  caricamentoDettagliUtente: ReturnType<typeof vi.fn>;
  dettagliUtente: ReturnType<typeof vi.fn>;
  caricareListaUtenti: ReturnType<typeof vi.fn>;
  setIdUtente: ReturnType<typeof vi.fn>;
  controlloAdmin: ReturnType<typeof vi.fn>;
  };

  let postsStoreMock: {
    postsDettagliUtente: ReturnType<typeof vi.fn>;
    setIdUtente: ReturnType<typeof vi.fn>;
  };

  let commentiStoreMock: {
    commentiPost: ReturnType<typeof vi.fn>;
    setIdPost: ReturnType<typeof vi.fn>;
    aggiungiCommento: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    // Creiamo i mock dei vari store, ma solamente i metodi che vengono utilizzati nel componente(HTML e TS)
    // Importante l'ordine: i mock devono essere creati prima di configureTestingModule,
    // perchè se no il componente nasce senza usarli
    utentiStoreMock = {
      caricamentoDettagliUtente: vi.fn(),
      dettagliUtente: vi.fn(),
      caricareListaUtenti: vi.fn(),
      setIdUtente: vi.fn(),
      controlloAdmin: vi.fn()
    }
    postsStoreMock = {
      postsDettagliUtente: vi.fn(),
      setIdUtente: vi.fn()
    }
    commentiStoreMock = {
      commentiPost: vi.fn(),
      setIdPost: vi.fn(),
      aggiungiCommento: vi.fn()
    }

    // Impostiamo i valori di default per il template
    utentiStoreMock.caricamentoDettagliUtente.mockReturnValue(false)
    utentiStoreMock.dettagliUtente.mockReturnValue({
      id: '1',
      name: 'Giuseppe Mazzini',
      email: 'gm@example.com',
      status: 'active',
      gender: 'male'
    });
    postsStoreMock.postsDettagliUtente.mockReturnValue([])
    commentiStoreMock.commentiPost.mockReturnValue([])

    // Dobbiamo Creare un admin finto per simulare la creazione o il controllo.
    // ritorniamo l'admin finto con of, creando un observable che si completa immediatamente con
    // il valore (adminFinto) 
    // (Quando questo mock viene chiamato, restituisci immediatamente questo valore)
    const adminFinto = {
      id: '958',
      name: 'Admin Finto',
      email: 'adminFinto@example.com'
    };
    (utentiStoreMock.controlloAdmin as any).mockReturnValue(of(adminFinto))

    await TestBed.configureTestingModule({
      imports: [DettagliUtente],
      providers: [
        {provide: UtentiStore, useValue: utentiStoreMock},
        {provide: PostsStore, useValue: postsStoreMock},
        {provide: CommentiStore, useValue: commentiStoreMock},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DettagliUtente);
    component = fixture.componentInstance;

    // Essendo un input required Signal, Angular richiede che il valore venga
    // Impostato prima della change detenction, essendo che è impostato nel costruttore
    // Praticamente simuliamo un input-parent-child
    fixture.componentRef.setInput('idUtente', '1')

    // Prima avevo impostato il fixture.detectChanges anche qua per renderizzare il DOM.
    // Meglio di no se no da errore perchè dopo il primo render del DOM nei test poi cambiano i valori
    // e angular trova discordanza e fragilità nel DOM.
    // Quindi non lo renderizziamo ma lo renderizziamo dopo nei test dopo le apportate modifiche dei valori

    utentiStore = TestBed.inject(UtentiStore)
    postsStore = TestBed.inject(PostsStore)
    commentiStore = TestBed.inject(CommentiStore)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Dovrebbe comparire la stringa di caricamento a caricamentoDettagliUtente true', () => {
    // Impostiamo il caricamento in true
    utentiStoreMock.caricamentoDettagliUtente.mockReturnValue(true)
    // Rilettura del template con il nuovo valore
    fixture.detectChanges()

    // cerca nel dom l'elemento nativo (p) che contiene Caricamento...
    const elementoNativo = fixture.nativeElement

    // Ci aspettiamo che contega la scritta caricamento e non il nome dell'utente
    expect(elementoNativo.textContent).toContain('Caricamento Dati in corso...')
    expect(elementoNativo.textContent).not.toContain('Giuseppe Mazzini')
  });

  it('Dovrebbe comparire nome utente quando il caricamento è false', () => {
    // Nel beforeEach caricamento è già false ma visto che la dentro non abbiamo il detectChanges
    // dobbiamo renderizzarlo qua senza fare modifiche
    fixture.detectChanges();


    const elementoNativo = fixture.nativeElement
    expect(elementoNativo.textContent).toContain('Giuseppe Mazzini')
    expect(elementoNativo.textContent).toContain('gm@example.com')
    expect(elementoNativo.textContent).not.toContain('Caricamento Dati in corso...')
  })

  it('Dovrebbe partire il metodo setIdPost quando apro il panel', () => {
    // Creiamo un finto post e renderizziamo il DOM con i nuovi valori
    postsStoreMock.postsDettagliUtente.mockReturnValue([
      { id: '547', title: 'Titolo Test', body: 'Body Test' }
    ])
    fixture.detectChanges()

    // Troviamo l'elemento nel DOM che scatena il metodo
    // DebugElement viene utilizzato per una forma più accurata che al posto di nativeElement
    // query è un metodo di ricerca su DebugElement che restituisce un figlio che soddisfa una condizione
    // By.css converte un selettore: in questo caso cerca l'elemento mat-...
    const matPanel = fixture.debugElement.query(
      By.css('mat-expansion-panel')
    )
    // triggerEventHandler è un metodo che simula un evento Angular
    // opened è l'evento da guardare e null viene messo perchè non passiamo nulla in ingresso
    matPanel.triggerEventHandler('opened', null)
    // Ci aspettiamo che l'evento imposti l'id del post per caricare i suoi commenti
    expect(commentiStoreMock.setIdPost).toHaveBeenCalledWith('547')
  })

  it('Dovrebbe apparire la scritta che non ci sono commenti se la lista è vuota', () => {
    // Impostiamo che è presente un post fittizio nella lista
    postsStoreMock.postsDettagliUtente.mockReturnValue([
      { id: '547', title: 'Titolo Test', body: 'Body Test' }
    ])
    // Impostiamo che invece commenti è un array vuoto
    commentiStoreMock.commentiPost.mockReturnValue([])
    // Renderizziamo il DOM
    fixture.detectChanges()

    // Troviamo mat-panel e facciamo partire l'evento per aprirlo
    const matPanel = fixture.debugElement.query(
      By.css('mat-expansion-panel')
    )
    matPanel.triggerEventHandler('opened', null)
    
    // Ora controlliamo che ci sia un elemento nel DOM che contiene 'Non ci sono commenti...'
    const elementoNativo = fixture.nativeElement
    expect(elementoNativo.textContent).toContain('Non ci sono commenti. Inserisci tu il primo!!')
  })

  it('Il bottone submit dovrebbe essere disabilitato', () => {
    // Impostiamo un post fittizio e renderizziamo il DOM
    postsStoreMock.postsDettagliUtente.mockReturnValue([
      { id: '547', title: 'Titolo Test', body: 'Body Test' }
    ])
    fixture.detectChanges();
    // Cerchiamo il mat-panel e triggeriamo l'evento per aprirlo
    const matPanel = fixture.debugElement.query(
      By.css('mat-expansion-panel')
    )
    matPanel.triggerEventHandler('opened', null)
    // A sto punto cerchiamo il bottone submit
    const btnSubmit = fixture.debugElement.query(
      By.css('button[type="submit"]')
    )
    // Ci aspettiamo che la proprietà disabled sia true
    expect(btnSubmit.nativeElement.disabled).toBe(true)
  })

});


