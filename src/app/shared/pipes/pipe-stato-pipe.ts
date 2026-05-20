import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeStato',
  standalone: true
})
export class PipeStatoPipe implements PipeTransform {
  transform(testo: string | undefined): string {
    if (!testo) {
      return '';
    }
    const stato: Record<string, string> = {
      'active': 'Attivo',
      'inactive': 'Inattivo'
    }
    return stato[testo];
  }
}
