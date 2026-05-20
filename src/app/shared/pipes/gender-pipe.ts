import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  transform(testo: string | undefined): string {
    if (!testo) {
      return '';
    }
    const genere: Record<string, string> = {
      'male': 'Maschio',
      'female': 'Femmina'
    }
    return genere[testo]
    
  }
}
