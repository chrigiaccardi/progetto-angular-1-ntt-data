import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BarraDiRicerca {
  <div class="flex items-center justify-center gap-5 mb-5">
            @if(utentiStore.caricamento()) {
            <p class="text-xl text-bold text-blue-900 m-5">Caricamento Dati</p>
            <mat-spinner class="!h-10 !w-10"></mat-spinner>
            } @else if (utentiStore.errore()) {
            <p class="text-xl text-bold text-blue-900 m-5">Ops! {{utentiStore.errore()}}</p>
            } @else if(utentiStore.utenti() && utentiStore.utenti()?.length === 0) {
                <p class="text-xl text-bold text-blue-900 m-5">Mi dispiace! La ricerca non ha dato nessun riscontro, 0 Utenti trovati.</p>
            }
        </div>

        @for (utente of utentiStore.utenti(); track utente.id) {
        <app-item-lista-utenti [utente]="utente" />
        }
}
