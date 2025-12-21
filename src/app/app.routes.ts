import { Routes } from '@angular/router';
import {About} from './components/about/about';
import {Home} from './components/home/home';

export const routes: Routes = [
  {path: '', component: Home },
  {path: 'about', component: About }
];
