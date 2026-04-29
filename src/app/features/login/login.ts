import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatAnchor],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
