import { Routes } from '@angular/router';

import { CalendarComponent, PageNotFoundComponent } from './pages';
import { AuthGuard } from './core/guards';

export const routes: Routes = [
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/aboutme/aboutme.component').then(
        (m) => m.AboutmeComponent
      ),
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
