import { Routes } from '@angular/router';

import { Home } from './home';
import { Resources } from './resources/resources';
import { Projects } from './projects/projects';
import { Presences } from './presences/presences';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      { path: 'resources', component: Resources },
      { path: 'projects', component: Projects },
      { path: 'presences', component: Presences },
    ]
  },
];
