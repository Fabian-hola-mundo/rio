import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutContainer } from '../container/layout.container';
import { HomeContainer } from '../module/home/container/home.container';

export const layutRoutes: Route[] = [
  {
    path: '',
    component: LayoutContainer,
    children: [
      {
        path: 'home',
        component: HomeContainer,
        pathMatch: 'full',
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'inicio', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(layutRoutes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
