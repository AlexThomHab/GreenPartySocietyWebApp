import { Routes } from '@angular/router';
import {About} from './components/about/about';
import {Home} from './components/home/home';
import {Events} from './components/events/events';
import {Blog} from './components/blog/blog';

export const routes: Routes = [
  {path: '', component: Home },
  {path: 'about', component: About },
  {path: 'events', component: Events },
  {path: 'blog', component: Blog }

];
