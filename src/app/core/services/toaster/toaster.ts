import { inject, Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast'

@Injectable({
  providedIn: 'root',
})
export class Toaster {
  // Iniettiamo il servizio per poterlo utilizzare
  toaster = inject(HotToastService)

  successo(message: string) {
    this.toaster.success(message)
  }
  errore(message: string) {
    this.toaster.error(message)
  }
  
}
