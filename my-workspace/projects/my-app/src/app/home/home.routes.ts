import { Routes } from '@angular/router';

import { Home } from './home';
import { Dashboard } from './dashboard/dashboard';
import { Resources } from './resources/resources';
import { Projects } from './projects/projects';
import { Presences } from './presences/presences';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'resources', component: Resources },
      { path: 'projects', component: Projects },
      { path: 'presences', component: Presences },
    ]
  },
];
