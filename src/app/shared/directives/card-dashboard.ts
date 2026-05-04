import { Directive } from '@angular/core';

@Directive({
  selector: '[cardDashboard]',
  host: {
    class: 'border border-gray-200 rounded-xl p-6 bg-white shadow-xl'
  }
})
export class CardDashboard {
  constructor() {}
}
