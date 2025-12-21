import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Home} from './components/home/home';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {}

