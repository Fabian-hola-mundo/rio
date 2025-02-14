import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  {
    path: '',
    loadChildren: () =>
      import('../../core/module/user/router/layout.routes').then((m) => m.layutRoutes),
    title: 'Opi Technology',
  },
/*   {
    path: 'admin',
    loadChildren: () => import('../../core/module/admin/routes/admin.routing').then((m) => m.adminRoutes),
  }, */
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];
