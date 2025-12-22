import { Routes } from '@angular/router';
import { About } from './components/about/about';
import { Home } from './components/home/home';
import { Events } from './components/events/events';
import { Blog } from './components/blog/blog';
import {BlogDetailComponent} from './components/blog/blog-detail/blog-detail';
import {EventDetailComponent} from './components/events/event-detail/event-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },

  // Events
  { path: 'events', component: Events },
  { path: 'events/:id', component: EventDetailComponent },

  { path: 'blog', component: Blog },
  { path: 'blog/:id', component: BlogDetailComponent },
];
