import { Component } from '@angular/core';
import { PannelloDashboard } from '../../../../shared/directives/pannello-dashboard';

@Component({
  selector: 'app-pannello-post',
  imports: [PannelloDashboard],
  templateUrl: './pannello-post.html',
  styleUrl: './pannello-post.css',
})
export class PannelloPost {}
