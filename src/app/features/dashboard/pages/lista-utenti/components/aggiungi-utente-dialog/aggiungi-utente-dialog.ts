import { Component, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule} from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { UtentiStore } from '../../../../../../core/store/utenti-store';
import { MatOptionModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-aggiungi-utente-dialog',
  imports: [MatButtonModule, MatDialogModule, MatIconModule, MatFormFieldModule, ReactiveFormsModule, MatOptionModule, MatSelectModule, MatInputModule],
  templateUrl: './aggiungi-utente-dialog.html',
  styleUrl: './aggiungi-utente-dialog.css',
})
export class AggiungiUtenteDialog {
  // Iniettiamo NonNullableFormBuilder per non dichiarare in continuazione
  // che i valori protrebbero essere null e automaticamente resettare i campi
  formBuilder = inject(NonNullableFormBuilder);
  // Iniettiamo lo store per poterlo utilizare
  utentiStore = inject(UtentiStore);

  // Dichiariamo che il form ha determinati campi,
  // Validatori si accerta che siano validi e required che sono obbligatori
  aggiungiUtenteForm = this.formBuilder.group({
    name: this.formBuilder.control<string>('', [Validators.required]),
    email: this.formBuilder.control<string>('', [Validators.required]),
    gender: this.formBuilder.control<'male' | 'female'>('male', [Validators.required]),
    status: this.formBuilder.control<'active' | 'inactive'>('active', [Validators.required]),
  });

  aggiungiUtente() {
    this.utentiStore.aggiungiUtente(this.aggiungiUtenteForm.getRawValue())
  }
}
