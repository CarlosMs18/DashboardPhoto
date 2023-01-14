import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProgressComponent } from './progress/progress.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { PerfilComponent } from './mantenimiento/perfil/perfil.component';



const childRoutes: Routes = [
  {path : '', component: DashboardComponent, data : {title:'Dashboard'}},
  {path : 'account-settings',component:AccountSettingsComponent, data : {title:'Account-Settings'}},
  {path: 'progress',component : ProgressComponent, data : {title:'Progress'}},

  /* MANTENIMIENTO */
  {path : 'usuarios',component : UsuariosComponent, data : {title : 'Mantenimiento Usuarios'}},
  {path : 'perfil',component : PerfilComponent, data : {title : 'Perfil'}}
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutingModule {}
