import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  sideBarMenu : any = [
    {
      title : 'Dashboard',
      submenu : [
        {path:'', subtitle : 'Dashboard'},
        {path:'progress', subtitle : 'Progress'},
        {path:'account-settings', subtitle : 'Account-Settings'}
      ]
    },
    {
      title : 'Mantenimiento',
      submenu :[
        {path : 'usuarios', subtitle : 'Usuarios'},
        {path : 'hospitales', subtitle : 'Hospitales'},
        {path : 'medicos',subtitle : 'Medicos'},
        {path : 'perfil', subtitle : 'Perfil'},
      ]
    }
  ]

}
