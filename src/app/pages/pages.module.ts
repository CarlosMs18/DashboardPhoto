import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';
import { ImagenModule } from "../pipes/imagen.module";

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { PerfilComponent } from './mantenimiento/perfil/perfil.component';



@NgModule({
  declarations: [
    AccountSettingsComponent,
    DashboardComponent,
    ProgressComponent,
    PagesComponent,
    UsuariosComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    ComponentsModule,
    ImagenModule
  ]
})
export class PagesModule { }
