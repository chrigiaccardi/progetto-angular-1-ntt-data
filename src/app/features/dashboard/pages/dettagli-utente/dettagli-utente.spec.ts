import { ComponentFixture, TestBed } from '@angular/core/testing';

import  DettagliUtente  from './dettagli-utente'
import { UtentiStore } from '../../../../core/store/utentiStore/utenti-store';
import { PostsStore } from '../../../../core/store/postsStore/posts-store';
import { CommentiStore } from '../../../../core/store/commentiStore/commenti-store';
import { of } from 'rxjs';

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
    // Praticamente simuliamo un input-genitore-child
    fixture.componentRef.setInput('idUtente', '1')
    // detectChanges avvia il ciclo di change detection.
    // Nell'app Angular viene eseguita automaticamente ogni volta che succede qualcosa
    // Nei test bisogna chiamarlo manualmente
    fixture.detectChanges()

    utentiStore = TestBed.inject(UtentiStore)
    postsStore = TestBed.inject(PostsStore)
    commentiStore = TestBed.inject(CommentiStore)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


// 1. Loading State - se caricamento è true deve comparire caricamento dati
// 2. Rendering Utente - s eil caricamento è finito, viene restituito un utente, devono comparire nome e email
// 3. Evento apertura pannello - Quando pannello opened chiama set post id
// 4. Se la lista commenti è vuota deve apparire la scritta non ci sono commenti
// 5. se il form commenti è invalido il bottone deve essere disabilitato
// 6. Mostra conteggio quando viene ritornata la lista di posts
// 7. 

it('Dovrebbe comparire la stringa di caricamento', () => {
  
})