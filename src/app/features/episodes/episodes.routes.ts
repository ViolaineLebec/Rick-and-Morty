import type { Route } from '@angular/router';
import { Episodes } from './pages/episodes';

export const EPISODES_ROUTES: Route[] = [
  {
    path: '',
    component: Episodes,
  },
];
