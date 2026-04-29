import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PannelloDashboard } from "./components/pannello-dashboard/pannello-dashboard";


@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, PannelloDashboard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
