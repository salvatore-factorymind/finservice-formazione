import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot, Routes } from '@angular/router';

import { Home } from './home';


export const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      // { path: '', redirectTo: 'list', pathMatch: 'full' },
      // { path: 'list', component: ContactsList },
      // { path: 'detail/:id', component: ContactDetail, canDeactivate: [pendingChangesGuard] },

      // { path: 'cars', component: CarsList },
    ]
  },
];
