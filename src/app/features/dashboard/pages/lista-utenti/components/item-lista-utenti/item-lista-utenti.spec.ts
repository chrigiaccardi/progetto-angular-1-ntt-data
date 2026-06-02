import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListaUtenti } from './item-lista-utenti';
import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';

describe('ItemListaUtenti', () => {
  let component: ItemListaUtenti;
  let fixture: ComponentFixture<ItemListaUtenti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListaUtenti],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListaUtenti);
    component = fixture.componentInstance;
    // Visto che il componente si basa su input di dati per testarlo devo inserire in input dei dati fasulli
    fixture.componentRef.setInput('utente', {
      id: '1',
      name: 'Eugenio',
      email: 'gege@example.com',
      gender: 'male',
      status: 'inactive'
    })
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
