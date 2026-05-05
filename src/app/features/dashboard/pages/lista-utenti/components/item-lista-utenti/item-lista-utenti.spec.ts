import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListaUtenti } from './item-lista-utenti';

describe('ItemListaUtenti', () => {
  let component: ItemListaUtenti;
  let fixture: ComponentFixture<ItemListaUtenti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListaUtenti],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListaUtenti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
