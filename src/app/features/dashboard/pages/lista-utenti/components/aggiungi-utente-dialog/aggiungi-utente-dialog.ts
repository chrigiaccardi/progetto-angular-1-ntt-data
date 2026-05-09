import { Component, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogClose } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NonNullableFormBuilder, Validators } from "@angular/forms";
import { UtentiStore } from '../../../../../../core/store/utenti-store';

@Component({
  selector: 'app-aggiungi-utente-dialog',
  imports: [MatButtonModule, MatDialogClose, MatIconModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
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
    nomeCognome: ['', Validators.required],
    email: ['', Validators.required],
    genere: ['male', Validators.required],
    stato: ['active', Validators.required],
  });

  aggiungiUtente() {
    
  }
}
