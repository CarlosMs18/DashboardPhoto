import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routes';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthRoutingModule } from './auth/auth.routes';

const routes: Routes = [
  {
    path : '', redirectTo:'/dashboard', pathMatch: 'full'
  },
  {
    path : '**',component : PagenotfoundComponent
  }
 /*  {
    path :'**', redirectTo : '('
  } */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
