import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import { RouterModule } from '@angular/router';
import { ImagenModule } from '../pipes/imagen.module';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcumbsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ImagenModule
  ],
  exports :[
    HeaderComponent,
    SidebarComponent,
    BreadcumbsComponent
  ]
})
export class SharedModule { }
