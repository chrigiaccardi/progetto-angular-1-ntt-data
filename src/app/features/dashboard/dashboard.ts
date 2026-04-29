import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PannelloUtenti } from "./components/pannello-utenti/pannello-utenti";
import { PannelloPost } from "./components/pannello-post/pannello-post";

@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, PannelloUtenti, PannelloPost],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
