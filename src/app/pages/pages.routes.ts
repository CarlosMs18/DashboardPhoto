import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
/*
import { HomeComponent } from './';
import { Name2Component } from './';
import { Name3Component } from './';
import { Name4Component } from './';
import { PageNotFoundComponent } from './'; */
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path : 'dashboard',
    component : PagesComponent,

    canActivate : [AuthGuard],
    canLoad : [AuthGuard],
    loadChildren : () => import('./child-routes.module').then(m => m.ChildRoutingModule)
  }
 /*  { path: '', component: HomeComponent },
  { path: 'path2', component: Name2Component },
  { path: 'path3', component: Name3Component },
  { path: 'path4', component: Name4Component },
  { path: '**', component: PageNotFoundComponent }, */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
