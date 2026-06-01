import { ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';

import  ListaUtenti  from './lista-utenti';
import { computed, Signal, signal, WritableSignal } from '@angular/core';
import { Utente } from '../../../../core/models/utente';
import { UtentiStore } from '../../../../core/store/utentiStore/utenti-store';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('ListaUtenti', () => {
  let component: ListaUtenti;
  let fixture: ComponentFixture<ListaUtenti>;

  // Dichiariamo i mock degli store e i metodi che utilizziamo
  let utentiStoreMock: {
    utenti: WritableSignal<Utente[]>
    caricamento: WritableSignal<boolean>
    errore: WritableSignal<Error | undefined>
    paginaCorrente: WritableSignal<number>
    itemXPagina: WritableSignal<number>
    paginaSuccessiva: Signal<number>
    paginaPrecedente: Signal<number>
    opzioniItemPagina: Signal<number[]>

    itemPerPagina: ReturnType<typeof vi.fn>
  }
  let erroreRicerca: WritableSignal<boolean>

  beforeEach(async () => {

    // Creiamo i mock dei store e metodi che utilizziamo
    utentiStoreMock = {
      utenti: signal([]),
      caricamento: signal(false),
      errore: signal(undefined),
      paginaCorrente: signal(2),
      itemXPagina: signal(5),
      paginaSuccessiva: computed(() => utentiStoreMock.paginaCorrente() + 1),
      paginaPrecedente: computed(() => utentiStoreMock.paginaCorrente() - 1),
      opzioniItemPagina: signal([]),

      itemPerPagina: vi.fn()
    }
    erroreRicerca = signal(false)

    await TestBed.configureTestingModule({
      imports: [ListaUtenti],
      providers: [
        { provide: UtentiStore, useValue: utentiStoreMock },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaUtenti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  // Inizio Test

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Dovrebbe visualizzare gli utenti nella lista', () => {
    utentiStoreMock.utenti.set([
      {id: '1', name: 'Stefano', email: 'ste@gmail.com', gender: 'male', status: 'active'},
      {id: '2', name: 'Elisa', email: 'eli@gmail.com', gender: 'female', status: 'active'},
      {id: '3', name: 'Ginevra', email: 'ginny@gmail.com', gender: 'female', status: 'inactive'},
      {id: '4', name: 'Carlotta', email: 'otta@gmail.com', gender: 'female', status: 'inactive'}
    ])
    fixture.detectChanges();

    const itemUtenti = fixture.debugElement.queryAll(
      By.css('app-item-lista-utenti')
    )

    expect(itemUtenti.length).toBe(4)
  })
  

  it('Dovrebbe chiamare cambioItemPagina con il valore selezionato', () => {
    fixture.detectChanges()
    const select = fixture.debugElement.query(
      By.css('select')
    )
    expect(select).toBeDefined()
    // Facciamo partire l'evento change e impostiamo il valore a 10
    select.triggerEventHandler('change', {
      target: { value: '10'}
    })

    expect(utentiStoreMock.itemPerPagina).toHaveBeenCalledWith(10)
  })

});
