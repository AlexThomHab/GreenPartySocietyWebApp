import { Component } from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    RouterLink,
    RouterModule
  ]
})
export class Home {}
