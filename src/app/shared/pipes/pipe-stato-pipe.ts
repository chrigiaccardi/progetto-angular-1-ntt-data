import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeStato',
  standalone: true
})
export class PipeStatoPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }
    const stato: Record<string, string> = {
      'active': 'Attivo',
      'inactive': 'Inattivo'
    }
    return stato[value];
  }
}
